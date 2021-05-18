import { openReverseGeocoder as geocoder } from './main'

test('東京駅 [139.7673068, 35.6809591]', async () => {
  const res = await geocoder([139.7673068, 35.6809591])
  expect(res).toStrictEqual({
    code: '13101',
    prefecture: '東京都',
    city: '千代田区',
  })
})

test('大阪駅 [135.4983028, 34.7055051]', async () => {
  const res = await geocoder([135.4983028, 34.7055051])
  expect(res).toStrictEqual({
    code: '27127',
    prefecture: '大阪府',
    city: '大阪市北区',
  })
})

test('串本町 [135.781478, 33.472551]', async () => {
  const res = await geocoder([135.781478, 33.472551])
  expect(res).toStrictEqual({
    code: '30428',
    prefecture: '和歌山県',
    city: '東牟婁郡串本町',
  })
})

test('北海道羅臼町 [145.189681, 44.021866]', async () => {
  const res = await geocoder([145.189681, 44.021866])
  expect(res).toStrictEqual({
    code: '01694',
    prefecture: '北海道',
    city: '目梨郡羅臼町',
  })
})

test('八丈町 [139.785231, 33.115122]', async () => {
  const res = await geocoder([139.785231, 33.115122])
  expect(res).toStrictEqual({
    code: '13401',
    prefecture: '東京都',
    city: '八丈町',
  })
})
