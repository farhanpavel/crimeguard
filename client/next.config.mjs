/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add the domain(s) you want to allow
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
