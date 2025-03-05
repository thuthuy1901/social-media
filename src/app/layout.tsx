import { Nunito } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ReactQueryProvider from './ReactQueryProvider';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { fileRouter } from './api/uploadthing/core';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${nunito.variable} antialiased custom`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
