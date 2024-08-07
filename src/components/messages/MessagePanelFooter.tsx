import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { postNewMessage } from "@/utils/api";
import { useParams } from "react-router-dom";

const messageFormSchema = z.object({
  content: z.string().min(1),
});

const MessagePanelFooter = () => {
  const { id } = useParams();
  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof messageFormSchema>) => {
    if (!id) return;
    try {
      await postNewMessage({
        conversationId: parseInt(id),
        content: values.content,
      });
    } catch (err) {
      console.log(err);
    } finally {
      form.reset();
    }
  };

  return (
    <div className='flex mx-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Aa'
                    className='w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-400 rounded-3xl text-neutral-100 bg-neutral-700'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default MessagePanelFooter;
