import { geoContains } from 'd3-geo'
import { lngLatToGoogle } from 'global-mercator'
import Protobuf from 'pbf'
import fetch from 'node-fetch'

const vt = require('@mapbox/vector-tile')

const zoom = 10

export interface ReverseGeocodingResult {
  code: string
  prefecture: string
  city: string
}

export const geocoder: (input: number[]) => Promise<ReverseGeocodingResult> = async (lnglat: number[]) => {
  const [x, y] = lngLatToGoogle(lnglat, zoom)
  const tileUrl = `https://geolonia.github.io/open-reverse-geocoder/tiles/${zoom}/${x}/${y}.pbf`

  const res = await fetch(tileUrl)
  const buffer = await res.buffer()
  const tile = new vt.VectorTile(new Protobuf(buffer));
  var layers = Object.keys(tile.layers);

  if (!Array.isArray(layers))
      layers = [layers]

  const geocodingResult = {
    code: '',
    prefecture: '',
    city: '',
  }

  layers.forEach((layerID) => {
    var layer = tile.layers[layerID];
    if (layer) {
      for (let i = 0; i < layer.length; i++) {
        const feature = layer.feature(i).toGeoJSON(x, y, zoom)
        if (layers.length > 1) feature.properties.vt_layer = layerID

        const geojson = {
          "type": "FeatureCollection",
          "features": [feature]
        }

        // @ts-ignore
        const res = geoContains(geojson, lnglat)
        if (res) {
          geocodingResult.code = (5 === String(feature.id).length) ? String(feature.id) : `0${String(feature.id)}`
          geocodingResult.prefecture = feature.properties.prefecture
          geocodingResult.city = feature.properties.city
        }
      }
    }
  })

  return geocodingResult
}
