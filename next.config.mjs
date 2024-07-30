/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'logesh-job-board.s3.amazonaws.com',
           
          },
        ],
      },
};

export default nextConfig;
