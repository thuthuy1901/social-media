'use client';
import { loginSchema, type LoginValue } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { PasswordInput } from '@/components/ui/password-input';
import LoadingButton from '@/components/ui/loading-button';
import { signInAdmin } from './action';

const SignInAdmin = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = async (values: LoginValue) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signInAdmin(values);
      if (error) setError(error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="~space-y-3/5">
        {error && (
          <p className="text-red-500 font-semibold text-center">{error}</p>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  className="text-green-main font-medium"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  className="text-green-main font-medium"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <LoadingButton
            loading={isPending}
            type="submit"
            variant="transformToBottomBox"
            className="dark:bg-green-main dark:before:border-green-main"
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default SignInAdmin;
