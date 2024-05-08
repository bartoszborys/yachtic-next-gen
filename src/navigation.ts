import getPathnames from './getPathnames';

export const locales = ['en', 'pl', 'de'];
export const localePrefix = "as-needed";
export const pathnames = getPathnames();
export const toExternalHref = (url: string) => `https://yachtic.com/${url}`