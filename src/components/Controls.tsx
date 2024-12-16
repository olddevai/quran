import React from 'react';
import { Sun, Moon, MinusCircle, PlusCircle } from 'lucide-react';

interface ControlsProps {
  darkMode: boolean;
  fontSize: number;
  onToggleDarkMode: () => void;
  onFontSizeChange: (size: number) => void;
}

export function Controls({
  darkMode,
  fontSize,
  onToggleDarkMode,
  onFontSizeChange,
}: ControlsProps) {
  return (
    <div className="fixed bottom-4 right-4 flex space-x-2">
      <button
        onClick={onToggleDarkMode}
        className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
      >
        {darkMode ? (
          <Sun className="h-6 w-6" />
        ) : (
          <Moon className="h-6 w-6" />
        )}
      </button>
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full shadow-lg px-4">
        <button
          onClick={() => onFontSizeChange(fontSize - 0.1)}
          disabled={fontSize <= 0.8}
          className="p-2"
        >
          <MinusCircle className="h-6 w-6" />
        </button>
        <button
          onClick={() => onFontSizeChange(fontSize + 0.1)}
          disabled={fontSize >= 2}
          className="p-2"
        >
          <PlusCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}