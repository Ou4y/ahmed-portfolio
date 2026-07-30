import { useEffect, useState } from 'react'
import translations from '../data/translations.js'

const STORAGE_KEY = 'ahmed-raafat-language'
const supportedLanguages = ['en', 'ar']

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'en'
  }

  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
    return supportedLanguages.includes(savedLanguage) ? savedLanguage : 'en'
  } catch {
    return 'en'
  }
}

function useLanguage() {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    const isArabic = language === 'ar'

    document.documentElement.lang = language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'

    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // The language still works for this visit if storage is unavailable.
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === 'en' ? 'ar' : 'en',
    )
  }

  return {
    language,
    isArabic: language === 'ar',
    t: translations[language],
    toggleLanguage,
  }
}

export default useLanguage
