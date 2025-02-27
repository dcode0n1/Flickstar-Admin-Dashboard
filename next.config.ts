import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allows all hostnames
                port: '', // Allows any port
                pathname: '**', // Allows any path
            },
        ],
    },
    reactStrictMode: false,
    productionBrowserSourceMaps: true,
};

export default nextConfig;


