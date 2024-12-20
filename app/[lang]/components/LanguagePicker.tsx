import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

export default function LanguagePicker() {

    const languages = [
        {
            'code': 'en',
            'name': 'English'
        },
        {
          'code': 'pt',
          'name': 'Português'
        },
        {
          'code': 'es',
          'name': 'Español'
      }
    ]

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 outline-none border-neutral-950 text-sm font-semibold text-white">
          <GlobeAltIcon className='h-7 w-7'/>
          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 outline-none">
          <div className="py-0">
            {languages.map((lang, index) => {
                return (
                    <Menu.Item key={index}>
                        <Link href={`/${lang.code}`} className={'hover:bg-slate-200 block px-4 py-2 text-sm' + (index === 0 ? ' rounded-t-md' : '') + (index == languages.length - 1 ? ' rounded-b-md ' : '')}>
                            {lang.name}
                        </Link>
                    </Menu.Item>
                )
            })}
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}