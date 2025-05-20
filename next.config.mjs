import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // existing settings
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // ← Add this block:
  experimental: {
    esmExternals: 'loose',
  },
};

const mdxOptions = {
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
};

export default withMDX(mdxOptions)(nextConfig);
