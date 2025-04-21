import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'http://localhost:3000',
        'https://*.github.dev', // GitHub Codespaces
        'https://fictional-palm-tree-xgx7wg9j4pg2vvw9-3000.app.github.dev', // (optional: specific Codespace)
      ],
    },
  },
  

};

export default nextConfig;
