import React from 'react';
import type { Surah } from '../types/quran';

interface SurahListProps {
  surahs: Surah[];
  currentSurah: number;
  onSurahSelect: (number: number) => void;
}

export function SurahList({ surahs, currentSurah, onSurahSelect }: SurahListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Surahs</h2>
      <div className="space-y-2 max-h-[70vh] overflow-y-auto">
        {surahs?.map((surah) => (
          <button
            key={surah.number}
            onClick={() => onSurahSelect(surah.number)}
            className={`w-full text-left px-4 py-2 rounded-md ${
              currentSurah === surah.number
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{surah.number}. {surah.name}</span>
              <span className="text-sm text-gray-500">{surah.bengali_name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}