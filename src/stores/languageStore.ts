import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { en, type Translations } from '@/i18n/en'
import { it } from '@/i18n/it'
import { es } from '@/i18n/es'
import { fr } from '@/i18n/fr'

export type Language = 'en' | 'it' | 'es' | 'fr'

const translations: Record<Language, Translations> = { en, it, es, fr }

function detectLanguage(): Language {
  try {
    const nav = navigator.language.slice(0, 2).toLowerCase()
    if (nav === 'it') return 'it'
    if (nav === 'es') return 'es'
    if (nav === 'fr') return 'fr'
  } catch {}
  return 'en'
}

interface LanguageStore {
  lang: Language
  t: Translations
  setLang: (l: Language) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      lang: detectLanguage(),
      t: translations[detectLanguage()],
      setLang: (lang) => set({ lang, t: translations[lang] }),
    }),
    {
      name: 'origen-lang',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lang: s.lang }),
      onRehydrateStorage: () => (state) => {
        if (state) state.t = translations[state.lang]
      },
    }
  )
)
