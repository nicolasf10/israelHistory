import type { Config } from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "betar-beige": "var(--betar-beige)"
      },
      fontFamily: {
        roboto: ['Roboto Condensed', ...fontFamily.sans],
        source_sans: ['var(--font-source_sans)', ...fontFamily.sans],
        'libre': ['Libre Baskerville']
      }
    },
  },
  plugins: [],
}
export default config
