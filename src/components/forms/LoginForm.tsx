import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postLoginUser } from "@/utils/api";

const formLoginSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(2).max(50),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    try {
      await postLoginUser(values);
      navigate("/conversations");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
        >
          <h2 className='mb-2 text-4xl font-semibold text-center'>
            Login Form
          </h2>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='********'
                    className='text-slate-900'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Login
          </Button>
          <div className='flex items-center justify-center gap-8'>
            <span className='text-slate-500'>You haven't any account? </span>
            <Link to='/register'>
              <span className='text-blue-500'>Register</span>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
