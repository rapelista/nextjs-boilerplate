'use client';

export function LoginForm() {
  return (
    <form
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
