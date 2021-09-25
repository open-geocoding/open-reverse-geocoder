# @geolonia/open-reverse-geocoder

オープンソースかつ無料で利用できる逆ジオコーダーです。

この NPM モジュールを使用すると、緯度経度から都道府県名および市区町村名を検索することができます。

都道府県名および市区町村名を検索するために必要なデータを、ベクトルタイルフォーマットで GitHub ページ上にホストしていますので、安心して無料でご利用いただけます。

[デモ](https://codepen.io/geolonia/pen/oNZLPQP)

また、GitHub ページ上にホストしたベクトルタイルを使用して都道府県名と市区町村を取得するという仕様のため、このモジュールを開発する Geolonia では個人情報の収集を一切行っておらず、安心してご利用ただけます。

## 仕組み

1. `openReverseGeocoder()` の引数として指定された緯度経度を元に、クライアントサイドでズームレベル10相当（約30km平米）のタイル番号を取得し、ウェブサーバーからベクトルタイルを AJAX でダウンロードします。
2. AJAX でダウンロードしたベクトルタイルの中に含まれる市区町村のポリゴンの中から、指定された緯度経度が含まれるポリゴンをクライアントサイドで検索し、都道府県名及び市区町村名を返します。

## インストール方法

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

または

```
const { openReverseGeocoder } = require(@geolonia/open-reverse-geocoder)

const result = await openReverseGeocoder([139.7673068, 35.6809591])
console.log(result) // {"code": "13101", "prefecture": "東京都", "city": "千代田区"}
```
## ライセンス

MIT
