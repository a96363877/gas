import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "سلندر غاز | خدمة توصيل اسطوانات الغاز",
  description: "خدمة توصيل اسطوانات الغاز المنزلية الرائدة في الكويت",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
