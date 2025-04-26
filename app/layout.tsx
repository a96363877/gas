import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
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
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider></body>
    </html>
  );
}
