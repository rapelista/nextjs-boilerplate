import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import localFont from 'next/font/local';
import { Providers } from '~/components/providers';
import '~/styles/globals.css';

const plusJakartaSans = localFont({
  src: '../fonts/PlusJakartaSansVF.ttf',
  display: 'swap',
  weight: '200 800',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={plusJakartaSans.className}>
        <Providers>
          <MantineProvider>{children}</MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
