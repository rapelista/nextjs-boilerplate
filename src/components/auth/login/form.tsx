'use client';

import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToggle } from '~/hooks/use-toggle';
import { LoginSchema } from './schema';

export function LoginForm() {
  const router = useRouter();
  const [loading, toggle] = useToggle();

  const form = useForm({
    mode: 'uncontrolled',
    validate: zodResolver(LoginSchema),
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    toggle();
    const { username, password } = values;

    const result = await signIn('user-login', {
      username,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    if (result?.url) {
      notifications.show({
        color: 'green',
        title: 'Login success!',
        message: 'Welcome to our dashboard.',
        position: 'top-center',
      });

      router.push(result.url);
    } else {
      notifications.show({
        color: 'red',
        title: 'Login failed!',
        message: 'Please try again.',
      });

      toggle();
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md" miw={300}>
        <TextInput
          required
          label="Username"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <PasswordInput
          required
          label="Password"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Button type="submit" disabled={loading}>
          Login
        </Button>
      </Stack>
    </form>
  );
}
