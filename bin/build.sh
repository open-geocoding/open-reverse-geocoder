#!/usr/bin/env bash

set -ex

DIR=$(pwd)
mkdir -p $DIR/tmp
cd $DIR/tmp
wget https://nlftp.mlit.go.jp/ksj/gml/data/N03/N03-2020/N03-20200101_GML.zip -O ./data.zip
unzip -o ./data.zip
ogr2ogr -f GeoJSON admins.json N03-20_200101.shp
node --max_old_space_size=2048 ../bin/optimize-geojson.js > $DIR/tmp/_admins.json
tippecanoe --no-tile-compression --maximum-zoom=10 --minimum-zoom=10 -l japanese-admins -o admins.mbtiles _admins.json --force
rm -fr $DIR/docs/tiles && mb-util --image_format=pbf admins.mbtiles $DIR/docs/tiles
