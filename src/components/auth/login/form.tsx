'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  /**
   * This function is called when the form is submitted and it will handle the action of the form.
   * @param formData FormData object.
   */
  const handleSubmit = async (formData: FormData) => {
    const { username, password } = Object.fromEntries(formData);

    const result = await signIn('user-login', {
      username,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    if (result?.url) {
      router.push(result.url);
    } else {
      alert('Failed to login!');
    }
  };

  return (
    <form
      /**
       * Please note that we are using action instead of onSubmit.
       */
      action={handleSubmit}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '8px',
        maxWidth: '300px',
      }}
    >
      <label htmlFor="username">Username</label>
      <input id="username" name="username" type="text" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required />
      <button
        type="submit"
        style={{
          gridColumn: '1 / span 2',
          width: '100%',
          marginTop: '8px',
        }}
      >
        Login
      </button>
    </form>
  );
}
