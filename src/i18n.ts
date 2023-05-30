import * as React from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './translations/en/translation.json'
import es from './translations/es/translation.json'
import fr from './translations/fr/translation.json'
import pt from './translations/pt/translation.json'
import cn from './translations/cn/translation.json'
import ja from './translations/ja/translation.json'
import ko from './translations/ko/translation.json'
import ru from './translations/ru/translation.json'
import tr from './translations/tr/translation.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: en,
            es: es,
            fr: fr,
            pt: pt,
            cn: cn,
            ja: ja,
            ko: ko,
            ru: ru,
            tr: tr
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    })

export default i18n
