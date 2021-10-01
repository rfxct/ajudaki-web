const path = require('path')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.dicebear.com', 'meetanentrepreneur.lu'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/login',
        permanent: true,
      }
    ]
  }
}
