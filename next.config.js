/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['official.neonecy.com'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;