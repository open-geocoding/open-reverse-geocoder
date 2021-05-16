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
