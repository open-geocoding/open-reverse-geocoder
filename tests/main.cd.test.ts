import { openReverseGeocoder as geocoder } from '../src/main'

describe('Tests for DRC', () => {
  test('Kole [23.0429,-4.3292]', async () => {
    const res = await geocoder([23.0429, -4.3292])
    expect(res).toStrictEqual({
      code: 'CD8306',
      country: 'République Démocratique du Congo',
      province: 'Sankuru',
      district: 'Kole',
    })
  })
})
