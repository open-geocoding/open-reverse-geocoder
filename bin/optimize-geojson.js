const geojson = require('../tmp/admins.json')

for (let i = 0; i < geojson.features.length; i++) {
    for (const key in geojson.features[i].properties) {
        if (null === geojson.features[i].properties[key] || '所属未定地' === geojson.features[i].properties[key] || geojson.features[i].properties[key].match(/支庁$/)) {
            geojson.features[i].properties[key] = ''
        }
    }

    geojson.features[i].id = Number(geojson.features[i].properties.N03_007)
    const props = {
        prefecture: geojson.features[i].properties.N03_001,
        city: `${geojson.features[i].properties.N03_003}${geojson.features[i].properties.N03_004}`,
    }
    geojson.features[i].properties = props
}

console.log(JSON.stringify(geojson))
