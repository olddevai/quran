import React from 'react';
import { Bookmark, Share2, Play, Pause } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import type { Verse } from '../types/quran';

interface VerseCardProps {
  verse: Verse;
  fontSize: number;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export function VerseCard({ verse, fontSize, isBookmarked, onToggleBookmark }: VerseCardProps) {
  const { isPlaying, playAudio, stopAudio } = useAudioPlayer();

  const handleAudioToggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio(verse.audio_url);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {verse.verse_number}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={handleAudioToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={onToggleBookmark}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`}
            />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        className="text-right mb-4 leading-loose font-arabic"
        style={{ fontSize: `${fontSize}rem` }}
      >
        {verse.arabic_text}
      </div>
      <div
        className="text-gray-600 dark:text-gray-300 font-bengali"
        style={{ fontSize: `${fontSize * 0.9}rem` }}
      >
        {verse.bengali_text}
      </div>
    </div>
  );
}