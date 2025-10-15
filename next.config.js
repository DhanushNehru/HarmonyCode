/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  
  // Compress responses
  compress: true,
  
  // Environment validation during build
  generateBuildId: async () => {
    // Validate environment variables during build
    const { validateEnvironment } = require('./utils/validateEnv');
    try {
      validateEnvironment();
    } catch (error) {
      console.error('❌ Build failed due to missing environment variables:');
      console.error(error.message);
      process.exit(1);
    }
    return null; // Use default build ID
  },

  // Handle static file serving
  trailingSlash: false,
  
  // API routes optimization
  experimental: {
    // Enable modern bundle optimization
    optimizeCss: true,
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig
