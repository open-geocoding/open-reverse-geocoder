# @geolonia/open-reverse-geocoder

オープンソースかつ無料で利用できる逆ジオコーダーです。

この NPM モジュールを使用すると、緯度経度から都道府県名および市区町村名を検索することができます。

都道府県名および市区町村名を検索するために必要なデータを、ベクトルタイルとして GitHub ページ上にホストしていますので、安心して無料でご利用いただけます。

## インストール方法

```
$ npm install @geolonia/open-reverse-geocoder -S
```

## API

```
const { geocoder } = require(@geolonia/open-reverse-geocoder)

geocoder([139.7673068, 35.6809591]).then(result => {
  console.log(result) // {"code": "13101", "prefecture": "東京都", "city": "千代田区"}
})
```

## 開発者向け情報

### タイルのビルド方法

まず、このリポジトリをクローンする。

```
$ git clone git@github.com:geolonia/open-reverse-geocoder.git
$ cd open-reverse-geocoder
```

その後、以下のコマンドを順番に実行すること。

```
$ npm run build:tiles
```

#### 上述のコマンドの解説

1. まず国土数値情報から、最新の行政区域データをダウンロードする。最新版は URL が変わるので注意。
2. 解凍
3. `ogr2ogr` で GeoJSON に変換。ファイル名に注意。 (macOS の場合は `brew install gdal` でインストールできます)
4. タイルのプロパティを調整するためのスクリプトを実行。
5. `tippecanoe` で `*.mbtiles` を作成。意図的に圧縮を無効にしている。
6. タイルを分解して静的に利用できるようにする。
