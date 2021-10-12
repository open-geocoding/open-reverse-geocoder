import { openReverseGeocoder as geocoder } from '../src/main'

describe('Tests for UK', () => {
  test('London [-0.13637, 51.50334]', async () => {
    await expect(geocoder([-0.13637, 51.50334])).rejects.toThrow(
      'This service location is not currently available.',
    )
  })
})
