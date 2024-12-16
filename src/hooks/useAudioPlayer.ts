import { useState, useCallback } from 'react';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = useCallback(async (url: string) => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }

    const audio = new Audio(url);
    setCurrentAudio(audio);
    setIsPlaying(true);
    
    try {
      await audio.play();
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
      };
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  }, [currentAudio]);

  const stopAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  }, [currentAudio]);

  return { isPlaying, playAudio, stopAudio };
};