/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "api.dicebear.com",
      "ipfs.io",
      "alchemy.mypinata.cloud",
      "res.cloudinary.com",
      "ipfs.infura.io",
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
