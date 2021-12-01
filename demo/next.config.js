/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: '/open-reverse-geocoder',

  webpack(config) {
    config.resolve.alias['mapbox-gl'] = 'maplibre-gl'
    return config
  },
}
