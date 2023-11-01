/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "utfs.io",

            }
        ]
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/board/:path*',
    //             destination: 'http://localhost:9090/board/:path*'
    //         }
    //     ]
    // }
}

module.exports = nextConfig
