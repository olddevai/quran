import { useQuery } from 'react-query';
import { Verse, Surah } from '../types/quran';

const fetchSurah = async (surahNumber: number): Promise<Verse[]> => {
  const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
  if (!response.ok) {
    throw new Error('Failed to fetch surah');
  }
  const data = await response.json();
  return data.data.ayahs;
};

const fetchSurahList = async (): Promise<Surah[]> => {
  const response = await fetch('https://api.alquran.cloud/v1/surah');
  if (!response.ok) {
    throw new Error('Failed to fetch surah list');
  }
  const data = await response.json();
  return data.data;
};

export const useQuranData = (surahNumber: number) => {
  const surahQuery = useQuery(['surah', surahNumber], () => fetchSurah(surahNumber));
  const surahListQuery = useQuery('surahList', fetchSurahList);

  return {
    verses: surahQuery.data,
    isLoadingVerses: surahQuery.isLoading,
    surahList: surahListQuery.data,
    isLoadingSurahList: surahListQuery.isLoading,
    error: surahQuery.error || surahListQuery.error,
  };
};