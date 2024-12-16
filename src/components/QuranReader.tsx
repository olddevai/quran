import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Play, Bookmark, Share2 } from 'lucide-react';
import { useQuranStore } from '../store/quranStore';
import type { Verse } from '../types/quran';

export function QuranReader() {
  const { currentSurah, currentVerse, fontSize, bookmarks, toggleBookmark } = useQuranStore();
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch verses in Arabic
  const { data: verses, isLoading } = useQuery(['surah', currentSurah], async () => {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${currentSurah}`);
    const data = await response.json();
    return data.data.ayahs;
  });

  // Fetch Bengali translation
  const { data: translations } = useQuery(['translation', currentSurah], async () => {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${currentSurah}/bn.bengali`
    );
    const data = await response.json();
    return data.data.ayahs;
  });

  const playAudio = async (verseNumber: number) => {
    const audio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${currentSurah}${verseNumber}.mp3`);
    setIsPlaying(true);
    await audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {verses?.map((verse: Verse, index) => (
          <div
            key={verse.number}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {verse.numberInSurah}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => playAudio(verse.numberInSurah)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  disabled={isPlaying}
                >
                  <Play className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleBookmark(verse.number)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      bookmarks.includes(verse.number) ? 'fill-current' : ''
                    }`}
                  />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              className="text-right mb-4 leading-loose"
              style={{ fontSize: `${fontSize}rem` }}
            >
              {verse.text}
            </div>
            <div
              className="text-gray-600 dark:text-gray-300"
              style={{ fontSize: `${fontSize * 0.9}rem` }}
            >
              {translations && translations[index]?.text
                ? translations[index].text
                : 'Translation not available'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
