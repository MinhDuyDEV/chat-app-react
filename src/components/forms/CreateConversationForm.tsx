import { z } from "zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AppDispatch } from "@/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createConversationThunk } from "@/store/conversationSlice";

const createConversationFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  message: z.string().min(1, {
    message: "Message must be at least 1 character long",
  }),
});

type CreateConversationFormProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const CreateConversationForm: FC<CreateConversationFormProps> = ({
  setIsOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof createConversationFormSchema>>({
    resolver: zodResolver(createConversationFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof createConversationFormSchema>
  ) => {
    try {
      dispatch(createConversationThunk(values))
        .unwrap()
        .then(({ data }) => {
          navigate(`/conversations/${data.id}`);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormControl>
                <Input
                  placeholder='email'
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
              <FormLabel>Message</FormLabel>
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
