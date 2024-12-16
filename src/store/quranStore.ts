import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuranState } from '../types/quran';

const useQuranStore = create<QuranState>()(
  persist(
    (set) => ({
      currentSurah: 1,
      currentVerse: 1,
      darkMode: false,
      fontSize: 1.0,
      reciter: 'ar.alafasy',
      bookmarks: [],
      readingProgress: {},
      setCurrentSurah: (surah: number) => set({ currentSurah: surah }),
      setCurrentVerse: (verse: number) => set({ currentVerse: verse }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setFontSize: (size: number) => set({ fontSize: size }),
      setReciter: (reciter: string) => set({ reciter }),
      toggleBookmark: (verseId: number) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(verseId)
            ? state.bookmarks.filter((id) => id !== verseId)
            : [...state.bookmarks, verseId],
        })),
      updateProgress: (surah: number, verse: number) =>
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [surah]: verse,
          },
        })),
    }),
    {
      name: 'quran-storage',
    }
  )
);