/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    // Handle slash/www in proxy.ts so there is only one hop, always to boxingessential.com/slug
    skipTrailingSlashRedirect: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.sanity.io' },
        ],
    },
};

module.exports = nextConfig;
