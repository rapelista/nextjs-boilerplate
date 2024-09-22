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
      <body className={plusJakartaSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
