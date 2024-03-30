import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import getPathnames from './getPathnames';
import { Pathnames } from 'next-intl/navigation';
import { locales } from './navigation';

export default async function middleware(request: NextRequest) {
  const pathnames = getPathnames() satisfies Pathnames<typeof locales>;

  return (createMiddleware({
    defaultLocale: 'en',
    localePrefix: "as-needed",
    localeDetection: false,
    pathnames,
    locales,
  }))(request);
}
 
export const config = {
  matcher: '/((?!api|_next/static|_next/image|.*svg|.*png).*)',
};