import {
  ReverseGeocodingOptions,
  ReverseGeocodingResultCountry,
  ReverseGeocodingResultJP,
} from './interfaces'

/**
 * vector tiles settings for checking country code
 */
export const wbCountryOption: ReverseGeocodingOptions = {
  zoomBase: 6,
  tileUrl: `https://open-geocoding.github.io/wb-countries/tiles/{z}/{x}/{y}.pbf`,
  layer: 'wb_countries',
  getResult: function (feature: GeoJSON.Feature) {
    const res: ReverseGeocodingResultCountry = {
      code: feature.properties?.iso_a2,
      name: feature.properties?.wb_name,
    }
    return res
  },
}

/**
 * vector tiles settings for each country
 */
const countryOptions: { [s: string]: ReverseGeocodingOptions } = {
  JP: {
    zoomBase: 10,
    tileUrl: `https://open-geocoding.github.io/open-reverse-geocoder-ja/tiles/{z}/{x}/{y}.pbf`,
    layer: 'japanese-admins',
    getResult: function (feature: GeoJSON.Feature) {
      const res: ReverseGeocodingResultJP = {
        code:
          5 === String(feature.id).length
            ? String(feature.id)
            : `0${String(feature.id)}`,
        prefecture: feature.properties?.prefecture,
        city: feature.properties?.city,
      }
      return res
    },
  },
}

// default country options
countryOptions.DEFAULT = countryOptions.JP

export default countryOptions
