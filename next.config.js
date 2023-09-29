/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	images: {
		domains: ["tailwindui.com", "media.graphassets.com"],
		formats: ["image/avif", "image/webp"],
	},
	experimental: {
		typedRoutes: true,
		mdxRs: true,
		serverActions: true,
		// workerThreads: false,
		// cpus: 1,
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: true,
			},
		];
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
