import { LoginForm } from '~/components/auth/login/form';

export default function Page() {
  return (
    <div
      style={{
        margin: '0 auto',
        width: 'fit-content',
      }}
    >
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
