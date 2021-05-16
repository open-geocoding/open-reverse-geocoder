import { geocoder } from './main'

const lnglat = [139.7673068, 35.6809591]

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
