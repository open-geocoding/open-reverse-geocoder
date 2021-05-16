import { geoContains } from 'd3-geo'
import { lngLatToGoogle } from 'global-mercator'
import Protobuf from 'pbf'
import fetch from 'node-fetch'
import vt from '@mapbox/vector-tile'
import { URL } from 'url'
import { readFileSync } from 'fs'

export interface ReverseGeocodingResult {
  code: string
  prefecture: string
  city: string
}

type LngLat = [number, number]

export interface ReverseGeocodingOptions {
  /** どのズームを使うか。デフォルトは 10 */
  zoomBase: number

  /** タイルが入ってるURLフォーマット。 */
  tileUrl: string
}

const DEFAULT_OPTIONS: ReverseGeocodingOptions = {
  zoomBase: 10,
  tileUrl: `https://geolonia.github.io/open-reverse-geocoder/tiles/{z}/{x}/{y}.pbf`,
}

const geocodingResult = {
  code: '',
  prefecture: '',
  city: '',
}

const isUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch(error) {
    return false
  }
}

export const geocoder: (
  input: LngLat,
  options?: Partial<ReverseGeocodingOptions>,
) => Promise<ReverseGeocodingResult> = async (lnglat, inputOptions = {}) => {
  const options: ReverseGeocodingOptions = {
    ...DEFAULT_OPTIONS,
    ...inputOptions,
  }
  const [x, y] = lngLatToGoogle(lnglat, options.zoomBase)
  const tileUrl = options.tileUrl
    .replace('{z}', String(options.zoomBase))
    .replace('{x}', String(x))
    .replace('{y}', String(y))

  let buffer
  if (isUrl(tileUrl)) {
    const res = await fetch(tileUrl)
    if (! res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`)
    }
    buffer = await res.buffer()
  } else {
    buffer = readFileSync(tileUrl)
  }

  const tile = new vt.VectorTile(new Protobuf(buffer))
  let layers = Object.keys(tile.layers)

  if (!Array.isArray(layers)) layers = [layers]

  layers.forEach((layerID) => {
    const layer = tile.layers[layerID]
    if (layer) {
      for (let i = 0; i < layer.length; i++) {
        const feature = layer.feature(i).toGeoJSON(x, y, options.zoomBase)
        if (layers.length > 1) feature.properties.vt_layer = layerID

        const geojson = {
          type: 'FeatureCollection',
          features: [feature],
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = geoContains(geojson as any, lnglat)
        if (res) {
          geocodingResult.code =
            5 === String(feature.id).length
              ? String(feature.id)
              : `0${String(feature.id)}`
          geocodingResult.prefecture = feature.properties.prefecture
          geocodingResult.city = feature.properties.city
        }
      }
    }
  })

  return geocodingResult
}
