import { Roboto_Mono } from 'next/font/google'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import MainSection from './components/MainSection'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import Link from 'next/link'

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
  const { sections, navigation, sources } = await getDictionary(lang);

  return (
    <div className='relative'>
      <Navbar eras={navigation}/>
      <MainSection lang={lang} sections={sections} accessKey={process.env.MAPBOX_ACCESS as string}/>
      <div className='fixed bottom-1 right-1 bg-blue-950 text-white z-50 p-1 rounded text-sm font-roboto'>
        <Link href={`/${lang}/sources`}>{sources.title}</Link>
      </div>
    </div>
  )
}
