import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const createConversationFormSchema = z.object({
  recipient: z.string().min(2, {
    message: "Recipient must be at least 2 characters.",
  }),
  message: z.string().optional(),
});

const CreateConversationForm = () => {
  const form = useForm<z.infer<typeof createConversationFormSchema>>({
    resolver: zodResolver(createConversationFormSchema),
    defaultValues: {
      recipient: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createConversationFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
        <FormField
          control={form.control}
          name='recipient'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormControl>
                <Input
                  placeholder='recipient'
                  className='text-slate-900'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder='message'
                  className='text-slate-900'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full bg-neutral-950'>
          Create conversation
        </Button>
      </form>
    </Form>
  );
};

export default CreateConversationForm;
