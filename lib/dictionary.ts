import 'server-only'
import { Locale } from '@/i18n.config'

const dictionaries = {
    en: () => import("@/dictionaries/en.json").then(module => module.default),
    pt: () => import("@/dictionaries/pt.json").then(module => module.default),
    es: () => import("@/dictionaries/es.json").then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()