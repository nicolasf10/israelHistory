import { Roboto_Mono } from 'next/font/google'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import MainSection from '../components/MainSection'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

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
  const { sources } = await getDictionary(lang);

  return (
    <div className='relative'>
      {/* Go back button */}
      <div className='p-3'>
        <Link className='' href={`/${lang}`}>Back</Link>
      </div>
      <div className='relative text-center text-3xl'>
        <h1 className='font-libre'>{sources.title}</h1>
      </div>
      <ul className='p-10'>
        {sources.data.map((source, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            {source.title && <h2 className='italic font-bold text-lg'>{source.title}</h2>}
            {source.author && <p><strong>Author:</strong> {source.author}</p>}
            {source.year && <p><strong>Year:</strong> {source.year}</p>}
            {source.publisher && <p><strong>Publisher:</strong> {source.publisher}</p>}
            {source.location && <p><strong>Location:</strong> {source.location}</p>}
            {source.pages && <p><strong>Pages:</strong> {source.pages}</p>}
            {source.url && (
              <p>
                <strong>URL:</strong>{' '}
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.url}
                </a>
              </p>
            )}
            {source.access_date && <p><strong>Access Date:</strong> {source.access_date}</p>}
            {source.access_dates && (
              <p>
                <strong>Access Dates:</strong> {source.access_dates.join(', ')}
              </p>
            )}
            {source.publication_date && <p><strong>Publication Date:</strong> {source.publication_date}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
