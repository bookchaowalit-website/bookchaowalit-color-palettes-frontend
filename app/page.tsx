'use client'

import { useState } from 'react';

interface Palette {
  name: string;
  colors: string[];
}

const presetPalettes: Palette[] = [
  { name: 'Sunset', colors: ['#FF6B6B', '#FFA06B', '#FFD93D', '#6BCB77', '#4D96FF'] },
  { name: 'Ocean', colors: ['#023E8A', '#0077B6', '#0096C7', '#48CAE4', '#90E0EF'] },
  { name: 'Forest', colors: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2'] },
  { name: 'Berry', colors: ['#7400B8', '#9D4EDD', '#C77DFF', '#E0AAFF', '#F3D9FA'] },
  { name: 'Warm', colors: ['#9B2222', '#CD5C5C', '#E9967A', '#F4A460', '#FFE4B5'] },
];

export default function ColorPalettes() {
  const [selectedPalette, setSelectedPalette] = useState<Palette>(presetPalettes[0]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const copyPalette = () => {
    navigator.clipboard.writeText(selectedPalette.colors.join('\n'));
    alert('Palette copied!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">🎨 Color Palettes</h1>
          <p className="text-gray-600 dark:text-gray-300">Discover beautiful color combinations</p>
        </div>

        {/* Selected Palette */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPalette.name} Palette</h2>
            <button
              onClick={copyPalette}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg"
            >
              Copy Palette
            </button>
          </div>
          
          <div className="flex h-32 rounded-xl overflow-hidden mb-6">
            {selectedPalette.colors.map((color, i) => (
              <div
                key={i}
                className="flex-1 flex items-center justify-center cursor-pointer hover:scale-105 transition"
                style={{ backgroundColor: color }}
                onClick={() => copyColor(color)}
              >
                <div className="bg-white bg-opacity-80 px-3 py-2 rounded-full text-sm font-mono font-medium">
                  {color}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4">
            {selectedPalette.colors.map((color, i) => (
              <div key={i} className="relative group">
                <div
                  className="h-24 rounded-xl cursor-pointer transition transform hover:scale-105 shadow-md"
                  style={{ backgroundColor: color }}
                  onClick={() => copyColor(color)}
                />
                {copiedColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl">
                    <span className="text-white text-xl">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preset Palettes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Preset Palettes</h2>
          <div className="grid grid-cols-5 gap-4">
            {presetPalettes.map((palette) => (
              <button
                key={palette.name}
                onClick={() => setSelectedPalette(palette)}
                className={`p-4 rounded-xl shadow-lg transition transform hover:scale-105 ${
                  selectedPalette.name === palette.name 
                    ? 'ring-4 ring-purple-500' 
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex h-20 rounded-lg overflow-hidden mb-2">
                  {palette.colors.map((color, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <div className="font-medium text-gray-900 dark:text-white">{palette.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Export As</h2>
          <div className="grid grid-cols-4 gap-4">
            <button className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 transition">
              <div className="text-2xl mb-1">🎨</div>
              <div className="text-sm font-medium">CSS</div>
            </button>
            <button className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 transition">
              <div className="text-2xl mb-1">📱</div>
              <div className="text-sm font-medium">Tailwind</div>
            </button>
            <button className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 transition">
              <div className="text-2xl mb-1">🎓</div>
              <div className="text-sm font-medium">JSON</div>
            </button>
            <button className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 transition">
              <div className="text-2xl mb-1">🖼️</div>
              <div className="text-sm font-medium">Image</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
