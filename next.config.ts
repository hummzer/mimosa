/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    qualities: [75, 80, 85, 90, 95, 100], // Add 100 to the allowed qualities
  },
};

module.exports = nextConfig;