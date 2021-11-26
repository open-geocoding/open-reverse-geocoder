# @geolonia/open-reverse-geocoder

- [Japanese](README.ja.md)

## About

This is a open source reverse geocoder.

This NPM package provides a feature to seach both prefecture name and city name from particular longitude/latitude.

In order to provide reverse-geocoding feature, we are hosting address data in Github pages.

Geolonia which develop this package does not collect any privacy information because it just utilize tilesets hosted in Github Pages.

[demo](https://codepen.io/geolonia/pen/oNZLPQP)

## Covered area

This reverse geocoding covers following countries.

- Japan
- DRC Congo
- Rwanda

## How it works

1. get the tile number equivalent to zoom level 10 (about 30 km square) on the client side based on the latitude and longitude specified as arguments of `openReverseGeocoder()`, and download the vector tiles from the web server with AJAX.
2. retrieves the polygons with the specified latitude and longitude from the polygons of cities contained in the vector tiles downloaded by AJAX on the client side, and returns the name of the prefecture and the name of the city.

## How to install

```
$ npm install @geolonia/open-reverse-geocoder -S
```

## How to use

```
const { openReverseGeocoder } = require(@geolonia/open-reverse-geocoder)

openReverseGeocoder([139.7673068, 35.6809591]).then(result => {
  console.log(result) // {"code": "13101", "prefecture": "東京都", "city": "千代田区"}
})
```

Or

```
const { openReverseGeocoder } = require(@geolonia/open-reverse-geocoder)

const result = await openReverseGeocoder([139.7673068, 35.6809591])
console.log(result) // {"code": "13101", "prefecture": "東京都", "city": "千代田区"}
```

## License

MIT
