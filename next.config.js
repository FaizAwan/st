// next.config.js
module.exports = {
    pageExtensions: ['ts', 'tsx'],
  
    webpack: (config, { isServer }) => {
      if (isServer) {
        // Custom webpack configuration for the server
        config.externals.push('buffer'); // Add 'buffer' as an external module
      }
  
      return config;
    },
  
    async redirects() {
      return [
        {
          source: '/api/:path*',
          destination: '/src/api/:path*',
          permanent: false,
        },
      ];
    },
  };
  