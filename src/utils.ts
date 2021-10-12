import { geoContains } from 'd3-geo'
import { lngLatToGoogle } from 'global-mercator'
import axios, { AxiosInstance } from 'axios'
import { VectorTile } from 'mapbox-vector-tile'
import { ReverseGeocodingOptions, ReverseGeocodingResult } from './interfaces'
import { wbCountryOption } from './countryOptions'

/**
 * Get a tile from targeted country's tilesets by using x and y tile index
 * @param x x tile index
 * @param y y tile index
 * @param options ReverseGeocodingOptions
 * @param api Axios object
 * @returns VectorTile object
 */
export const getTile = async (
  x: number,
  y: number,
  options: ReverseGeocodingOptions,
  api: AxiosInstance = axios,
): Promise<VectorTile> => {
  const tileUrl = options.tileUrl
    .replace('{z}', String(options.zoomBase))
    .replace('{x}', String(x))
    .replace('{y}', String(y))

  let buffer

  try {
    const res = await api.get(tileUrl, { responseType: 'arraybuffer' })
    buffer = Buffer.from(res.data, 'binary')
  } catch (error) {
    throw error
  }

  const tile = new VectorTile(buffer)
  return tile
}

/**
 * Get a result of reverse geocoding
 * @param tile VectorTile object
 * @param x x tile index
 * @param y y tile index
 * @param lnglat number[] longitude, latitude
 * @param options ReverseGeocodingOptions
 * @returns an object of result of reverse gecoding
 */
export const getTileResult = (
  tile: VectorTile,
  x: number,
  y: number,
  lnglat: [number, number],
  options: ReverseGeocodingOptions,
): ReverseGeocodingResult => {
  let layers = Object.keys(tile.layers)

  if (!Array.isArray(layers)) layers = [layers]

  let geocodingResult: ReverseGeocodingResult = {}
  layers.forEach((layerID) => {
    const layer = tile.layers[layerID]
    if (layer && options.layer === layer.name) {
      for (let i = 0; i < layer.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const feature: any = layer.feature(i).toGeoJSON(x, y, options.zoomBase)
        if (layers.length > 1) feature.properties.vt_layer = layerID

        const geojson = {
          type: 'FeatureCollection',
          features: [feature],
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = geoContains(geojson as any, lnglat)
        if (res) {
          geocodingResult = options.getResult(feature)
        }
      }
    }
  })
  return geocodingResult
}

/**
 * Get country information intersects with specified longitude and latitude
 * @param lnglat number[] longtitude, latitude
 * @param api Axios object
 * @returns Country Object eg. { code: 'JP', name: 'Japan'}
 */
export const getCountryCode = async (
  lnglat: [number, number],
  api: AxiosInstance = axios,
): Promise<ReverseGeocodingResult> => {
  const options = wbCountryOption
  const [x, y] = lngLatToGoogle(lnglat, options.zoomBase)

  const tile = await getTile(x, y, options, api)
  return getTileResult(tile, x, y, lnglat, options)
}
