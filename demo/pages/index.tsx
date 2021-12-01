import Head from 'next/head'
import { openReverseGeocoder } from '@geolonia/open-reverse-geocoder'
import { useState, useCallback } from 'react'
import MapGL from 'react-map-gl'

export const Home: React.VFC = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    longitude: 139.76710898064266,
    latitude: 35.68079385698033,
    zoom: 11,
  })
  const [address, setAddress] = useState('地図を動かしてください')

  const onViewportChange = useCallback(async (viewport) => {
    setViewport(viewport)
    const result = await openReverseGeocoder([
      viewport.longitude,
      viewport.latitude,
    ])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setAddress(result.prefecture + result.city)
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Demo of @geolonia/open-reverse-geocoder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="map">
        <MapGL
          {...viewport}
          mapStyle="https://raw.githubusercontent.com/geolonia/notebook/master/style.json"
          onViewportChange={onViewportChange}
        >
          <div className="center-marker"></div>
          <div className="header">
            <div id="address">{address}</div>
            <div className="credit">
              <a href="https://github.com/geolonia/open-reverse-geocoder">
                @geolonia/open-reverse-geocoder
              </a>
            </div>
          </div>
        </MapGL>
      </div>

      <style jsx>{`
        .container,
        #map {
          height: 100vh;
          width: 100vw;
          margin: 0;
          padding: 0;
        }

        .header {
          position: absolute;
          top: 0;
          margin: 8px;
          left: 50%;
          transform: translate(-50%, 0);
          padding: 8px;
          background-color: rgba(0, 0, 0, 0.5);
          border: 1px solid #eeeeee;
          color: #ffffff;
          text-align: center;
          font-size: 18px;
        }

        #address {
          font-size: 24px;
        }

        .center-marker {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          pointer-events: none;
        }

        .center-marker:before,
        .center-marker:after {
          position: absolute;
          left: 50%;
          content: '';
          height: 64px;
          width: 6px;
          background-color: rgba(0, 0, 0, 0.7);
        }

        .center-marker:before {
          transform: rotate(45deg);
        }

        .center-marker:after {
          transform: rotate(-45deg);
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home
