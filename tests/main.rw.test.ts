import { openReverseGeocoder as geocoder } from '../src/main'

describe('Tests for Rwanda', () => {
  test('Kigali [30.059708,-1.946116]', async () => {
    const res = await geocoder([30.059708, -1.946116])
    expect(res).toStrictEqual({
      code: '11090307',
      province: 'Kigali Town/Umujyi wa Kigali',
      district: 'Nyarugenge',
      sector: 'Nyarugenge',
      cell: 'Kiyovu',
      village: 'Inyarurembo',
    })
  })

  test('Kigali [29.246949,-1.685539]', async () => {
    const res = await geocoder([29.246949, -1.685539])
    expect(res).toStrictEqual({
      code: '33040312',
      province: 'West/Iburengerazuba',
      district: 'Rubavu',
      sector: 'Gisenyi',
      cell: 'Kivumu',
      village: 'Urumuri',
    })
  })
})
