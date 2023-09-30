import './globals.css'

import { Inter } from 'next/font/google'

import TanStackProvider from '@/providers/TanStackProvider'
import ToasterProvider from '@/providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vascomm',
  description: 'Vascomm Technical Test',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <ToasterProvider />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
