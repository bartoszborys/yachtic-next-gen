import getPathnames from './getPathnames';

export const locales = ['en', 'pl', 'de'];
export const localePrefix = "as-needed";
export const pathnames = getPathnames();
export const toExternalHref = (url: string) => `http://localhost:8083/${url}`