import {getRequestConfig, unstable_setRequestLocale} from 'next-intl/server';
import { IntlConfig } from 'next-intl';
import { locales } from './navigation';

type RequestConfig = Omit<IntlConfig, 'locale'>;
 
export default getRequestConfig(async ({locale}): Promise<RequestConfig> => {
  unstable_setRequestLocale(locale);
  if (!locales.includes(locale as any)) {
    return {
      messages: (await import(`../messages/en.json`)).default
    }
  };
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});