/** @type {import('next').NextConfig} */
const nextConfig = {webpack: (config) => {
    config.resolve.fallback = { 
      fs: false,  
      "mongodb-client-encryption": false ,
        async_hooks: false,
      "aws4": false 
    };

    return config;
  }};

export default nextConfig;
