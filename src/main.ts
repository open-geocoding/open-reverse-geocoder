import { lngLatToGoogle } from 'global-mercator'
import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import { ReverseGeocodingOptions, ReverseGeocodingResult } from './interfaces'
import countryOptions from './countryOptions'
import { getTile, getTileResult, getCountryCode } from './utils'

type LngLat = [number, number]

const cache = setupCache({
  maxAge: 60 * 60 * 24 * 1000,
})

const api = axios.create({
  adapter: cache.adapter,
})

export const openReverseGeocoder: (
  input: LngLat,
  options?: Partial<ReverseGeocodingOptions>,
) => Promise<ReverseGeocodingResult> = async (lnglat) => {
  const countryCode = await getCountryCode(lnglat, api)
  if (!(countryCode.code && countryOptions[countryCode.code])) {
    throw new Error(`This service location is not currently available.`)
  }
  const options: ReverseGeocodingOptions = countryOptions[countryCode.code]
  const [x, y] = lngLatToGoogle(lnglat, options.zoomBase)
  const tile = await getTile(x, y, options, api)
  return getTileResult(tile, x, y, lnglat, options)
}
