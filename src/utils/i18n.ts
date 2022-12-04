import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    supportedLngs: ['pl', 'en'],
    ns: [],
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false
    },
    debug: false,
    react: {
      useSuspense: true // fixes 'no fallback UI was specified' in react i18next when using hooks
    }
  })

export default i18n
