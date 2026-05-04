import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Currency = 'GBP' | 'EUR' | 'USD'

const SYMBOLS: Record<Currency, string> = { GBP: '£', EUR: '€', USD: '$' }

function detectCurrency(): Currency {
  try {
    const lang = navigator.language
    if (lang.includes('GB') || lang === 'en-GB') return 'GBP'
    if (['it', 'fr', 'es', 'de', 'pt', 'nl', 'be'].some((l) => lang.startsWith(l))) return 'EUR'
  } catch {}
  return 'USD'
}

interface CurrencyStore {
  currency: Currency
  rates: Partial<Record<Currency, number>>
  setCurrency: (c: Currency) => void
  fetchRates: () => Promise<void>
  convert: (amount: string, fromCurrency?: string) => string
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: detectCurrency(),
      rates: { USD: 1, GBP: 0.79, EUR: 0.93 },

      setCurrency: (currency) => set({ currency }),

      fetchRates: async () => {
        try {
          const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=GBP,EUR')
          if (!res.ok) return
          const data = await res.json()
          set({ rates: { USD: 1, GBP: data.rates.GBP, EUR: data.rates.EUR } })
        } catch {}
      },

      convert: (amount, fromCurrency = 'USD') => {
        const { currency, rates } = get()
        const num = parseFloat(amount)
        if (isNaN(num)) return `${SYMBOLS[currency]}0.00`
        const fromRate =
          fromCurrency === 'GBP' ? (rates.GBP ?? 0.79)
          : fromCurrency === 'EUR' ? (rates.EUR ?? 0.93)
          : 1
        const toRate =
          currency === 'GBP' ? (rates.GBP ?? 0.79)
          : currency === 'EUR' ? (rates.EUR ?? 0.93)
          : 1
        const converted = (num / fromRate) * toRate
        return `${SYMBOLS[currency]}${converted.toFixed(2)}`
      },
    }),
    {
      name: 'origen-currency',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ currency: s.currency }),
    }
  )
)
