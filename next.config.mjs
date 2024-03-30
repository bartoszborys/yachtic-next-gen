import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const __dirname = path.resolve();


const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};

export default withNextIntl(nextConfig);