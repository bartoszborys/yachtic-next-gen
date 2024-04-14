import type { Metadata } from "next";
import "./global.scss";
import Navbar from "@/components/Navbar";
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/navigation";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
 
export const metadata: Metadata = {
  title: "NextGen",
  description: "NextGenApp",
};

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  unstable_setRequestLocale(locale);

  return (
    <html>
      <body className={`flex flex-col min-h-dvh`}>
        <AppRouterCacheProvider>
          <header>
            <Navbar />
          </header>
          <main className="flex w-full flex-col flex-1 mt-[4rem]">{children}</main>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}