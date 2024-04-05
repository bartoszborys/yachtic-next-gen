import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const __dirname = path.resolve();


const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ocs.yachtic.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'media.yachtic.com',
            pathname: '**',
          },
        ],
      },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};

export default withNextIntl(nextConfig);