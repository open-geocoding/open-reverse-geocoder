import { ReverseGeocodingResult } from './ReverseGeocodingResult'

export interface ReverseGeocodingOptions {
  /** どのズームを使うか。デフォルトは 10 */
  zoomBase: number

  /** タイルが入ってるURLフォーマット。 */
  tileUrl: string

  /** 検索するレイヤーのID */
  layer: string

  /**
   * リバースジオコーディングの結果を取得するための関数
   * 国別の定義のところで個別に関数を作成する
   */
  getResult: (feature: GeoJSON.Feature) => ReverseGeocodingResult
}
