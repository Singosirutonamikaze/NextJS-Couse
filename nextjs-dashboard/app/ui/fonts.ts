import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',        // facultatif
  preload: false,         // facultatif
});

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});
