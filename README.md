

## 開発者向け情報

### タイルのビルド方法

まず、このリポジトリをクローンする。

```
$ git clone git@github.com:geolonia/open-reverse-geocoder.git
$ cd open-reverse-geocoder
```

その後、以下のコマンドを順番に実行すること。

```
$ wget https://nlftp.mlit.go.jp/ksj/gml/data/N03/N03-2020/N03-20200101_GML.zip
$ unzip ./N03-20200101_GML.zip
* ogr2ogr -f GeoJSON admins.json N03-20_200101.shp
$ NODE_OPTIONS=--max_old_space_size=4096 node bin/optimize-geojson.js > _admins.json
$ tippecanoe --no-tile-compression --maximum-zoom=10 -l japanese-admins -o admins.mbtiles _admins.json --force
$ rm -fr docs/tiles && mb-util --image_format=pbf admins.mbtiles docs/tiles
```

#### 上述のコマンドの解説

1. まず国土数値情報から、最新の行政区域データをダウンロードする。最新版は URL が変わるので注意。
2. 解凍
3. `ogr2ogr` で GeoJSON に変換。ファイル名に注意。
4. タイルのプロパティを調整するためのスクリプトを実行。
5. `tippecanoe` で `*.mbtiles` を作成。意図的に圧縮を無効にしている。
6. タイルを分解して静的に利用できるようにする。