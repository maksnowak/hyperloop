/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	experimental: {
		outputFileTracingIncludes: {
			'/api/*': ['./app/api/**/*'],
		},
	},
};

export default nextConfig;
