const json = require('../data/prefectures.json')


for (let i = 0; i < json.features.length; i++) {
    console.log(json.features[i].properties)
}