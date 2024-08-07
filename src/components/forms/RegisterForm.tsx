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
import { postRegisterUser } from "@/utils/api";

const formRegisterSchema = z.object({
  email: z.string().min(2).max(50).email(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formRegisterSchema>) => {
    try {
      await postRegisterUser(values);
      navigate("/login");
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
            Register Form
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
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='first name'
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
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='last name'
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
            Create My Account
          </Button>
          <div className='flex items-center justify-center gap-8'>
            <span className='text-slate-500'>Already have an account? </span>
            <Link to='/login'>
              <span className='text-blue-500'>Login</span>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
