/**
 * これはPoCです。
 */

const globalMercator = require('global-mercator') 
const vt2geojson = require('@mapbox/vt2geojson');
const d3 = require('d3-geo');

const lnglat = [139.7673068, 35.6809591] // 東京駅の緯度経度

const tile = globalMercator.lngLatToGoogle(lnglat, 10)
const tileUrl = `https://geolonia.github.io/open-reverse-geocoder/tiles/10/${tile[0]}/${tile[1]}.pbf`

vt2geojson({
  uri: tileUrl
}, (err, result) => {
  if (err) throw err;

  for (let i = 0; i < result.features.length; i++) {
    const feature = result.features[i]
    const geojson = {
      "type": "FeatureCollection",
      "features": [feature]
    }
    const res = d3.geoContains(geojson, lnglat)
    if (res) {
      console.log(feature.properties) // { prefecture: '東京都', city: '千代田区' }
    }
  }
});

