# @geolonia/open-reverse-geocoder

This is a open source reverse geocoder.

This NPM package provides a feature to seach both prefecture name and city name from particular longitude/latitude.

In order to provide reverse-geocoding feature, we are hosting address data in Github pages.

---
オープンソースかつ無料で利用できる逆ジオコーダーです。

この NPM モジュールを使用すると、緯度経度から都道府県名および市区町村名を検索することができます。

都道府県名および市区町村名を検索するために必要なデータを、ベクトルタイルフォーマットで GitHub ページ上にホストしていますので、安心して無料でご利用いただけます。

[demo/デモ](https://codepen.io/geolonia/pen/oNZLPQP)

Geolonia which develop this package does not collect any privacy information because it just utilize tilesets hosted in Github Pages.

---

また、GitHub ページ上にホストしたベクトルタイルを使用して都道府県名と市区町村を取得するという仕様のため、このモジュールを開発する Geolonia では個人情報の収集を一切行っておらず、安心してご利用ただけます。

## Covered area / カバーするエリア

This reverse geocoding covers following countries.

- Japan
- DRC Congo
- Rwanda

## Structure / 仕組み

1. get the tile number equivalent to zoom level 10 (about 30 km square) on the client side based on the latitude and longitude specified as arguments of `openReverseGeocoder()`, and download the vector tiles from the web server with AJAX.
2. retrieves the polygons with the specified latitude and longitude from the polygons of cities contained in the vector tiles downloaded by AJAX on the client side, and returns the name of the prefecture and the name of the city.

---

1. `openReverseGeocoder()` の引数として指定された緯度経度を元に、クライアントサイドでズームレベル10相当（約30km平米）のタイル番号を取得し、ウェブサーバーからベクトルタイルを AJAX でダウンロードします。
2. AJAX でダウンロードしたベクトルタイルの中に含まれる市区町村のポリゴンの中から、指定された緯度経度が含まれるポリゴンをクライアントサイドで検索し、都道府県名及び市区町村名を返します。

## How to install / インストール方法

```
$ npm install @geolonia/open-reverse-geocoder -S
```

## API

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
## License / ライセンス

MIT
