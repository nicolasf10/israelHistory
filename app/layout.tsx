import type { Metadata } from 'next'
import { Inter, Source_Sans_3, Roboto_Mono } from 'next/font/google'
import './globals.css'
import SectionContext from './[lang]/context/SectionContext'
import mapboxgl from 'mapbox-gl';
import { Locale } from '@/i18n.config'
//import ReactGA from 'react-ga';
// Initialize React Ga with your tracking ID
//ReactGA.initialize('G-Y7YZ9GVHMB');

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto_Mono({
  subsets: ['latin'],
  // this will be the css variable
  variable: '--font-roboto',
});

const source_sans = Source_Sans_3({
  subsets: ['latin'],
  // this will be the css variable
  variable: '--font-source_sans',
});

export const metadata: Metadata = {
  title: 'Historical Maps of the Land of Israel',
  description: 'Historical Maps of the Land of Israel, available in English, Português, and Español',
}

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// mapboxgl.accessToken = 'pk.eyJ1IjoidGhlby1mdWNocyIsImEiOiJjbG8xdTY2YWEwcmE1MmpxdTc2aTB5em9vIn0.5nVFaNsMgKWeqmNQQFPnxg';
// var map = new mapboxgl.Map({
//   container: 'map-container',
//   style: 'mapbox://styles/mapbox/streets-v11'
// });



export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {lang: Locale}
}) {
  return (
    <html lang="en">
      <head>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
        <title>Historical Maps of the Land of Israel</title>
      </head>
      <body className={`${source_sans.className} ${roboto.className}`}>
        <SectionContext>
          {children}
        </SectionContext>
      </body>
    </html>
  )
}
