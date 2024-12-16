export interface Verse {
  id: number;
  surah_number: number;
  verse_number: number;
  arabic_text: string;
  bengali_text: string;
  audio_url: string;
}

export interface Surah {
  number: number;
  name: string;
  bengali_name: string;
  verses_count: number;
  revelation_type: string;
}

export interface QuranState {
  currentSurah: number;
  currentVerse: number;
  darkMode: boolean;
  fontSize: number;
  reciter: string;
  bookmarks: number[];
  readingProgress: {
    [key: string]: number;
  };
}