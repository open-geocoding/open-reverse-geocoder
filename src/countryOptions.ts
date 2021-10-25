import {
  ReverseGeocodingOptions,
  ReverseGeocodingResultCountry,
  ReverseGeocodingResultJP,
  ReverseGeocodingResultCD,
  ReverseGeocodingResultRW,
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
  CD: {
    zoomBase: 12,
    tileUrl: `https://open-geocoding.github.io/open-reverse-geocoder-cd/tiles/{z}/{x}/{y}.pbf`,
    layer: 'cd_districts',
    getResult: function (feature: GeoJSON.Feature) {
      const res: ReverseGeocodingResultCD = {
        code: feature.properties?.adm2_pcode,
        province: feature.properties?.adm1_fr,
        district: feature.properties?.adm2_fr,
      }
      return res
    },
  },
  RW: {
    zoomBase: 14,
    tileUrl: `https://open-geocoding.github.io/open-reverse-geocoder-rw/tiles/{z}/{x}/{y}.pbf`,
    layer: 'rw_villages',
    getResult: function (feature: GeoJSON.Feature) {
      const res: ReverseGeocodingResultRW = {
        code: feature.properties?.village_id,
        province: feature.properties?.province,
        district: feature.properties?.district,
        sector: feature.properties?.sector,
        cell: feature.properties?.cell,
        village: feature.properties?.village,
      }
      return res
    },
  },
}

// default country options
countryOptions.DEFAULT = countryOptions.JP

export default countryOptions
