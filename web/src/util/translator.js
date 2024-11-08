import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translateVN from '../language/vi.json'
import translateEN from '../language/en.json'
const resources = {
    vi: { translation: translateVN },
    en: { translation: translateEN }
}
i18next.use(initReactI18next).init({
    keySeparator:".",
    debug: true,
    interpolation: {
        escapeValue: false,
    },
    resources: resources,
    lng: 'en',
    fallbackLng: 'en'
})
export default i18next