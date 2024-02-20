import { Roboto_Mono } from 'next/font/google'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import MainSection from './components/MainSection'
import Navbar from './components/Navbar'
import { useEffect } from 'react'

const roboto = Roboto_Mono({
  subsets: ['latin'],
  // this will be the css variable
  variable: '--font-roboto',
});

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { sections, navigation } = await getDictionary(lang);

  return (
    <div className='relative'>
      <Navbar eras={navigation}/>
      <MainSection lang={lang} sections={sections} accessKey={process.env.MAPBOX_ACCESS as string}/>
    </div>
  )
}
