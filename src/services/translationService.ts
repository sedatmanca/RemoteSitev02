import 'server-only'
import type { Locale } from '@/i18n/settings';
import { AsyncReturnType } from '@/types/asyncReturnType';

const dictionaries = {
  en: () => import('@/i18n/dictionaries/en.json').then((module) => module.default),
  tr: () => import('@/i18n/dictionaries/tr.json').then((module) => module.default),
}

export const getTranslation = async (locale: Locale) => dictionaries[locale]()

export type TTranslation = AsyncReturnType<typeof getTranslation>