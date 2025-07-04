// 'use client';
// import { useEffect, useState } from 'react';

// export default function ThemeManager() {
//   const [colorTheme, setColorTheme] = useState('root'); // default

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       document.body.classList.remove('theme-orange', 'theme-blue');
//       document.body.classList.add(colorTheme);
//     }
//   }, [colorTheme]);

//   return (
//     <div className="flex gap-2 items-center ml-4">
//       <label className="text-sm">Theme:</label>
//       <select
//         value={colorTheme}
//         onChange={(e) => setColorTheme(e.target.value)}
//         className="border border-input rounded-md px-2 py-1 text-sm bg-background text-foreground"
//       >
//         <option value="root">light</option>
//         <option value="theme-orange">Orange</option>
//         <option value="theme-blue">Blue</option>
//         {/* Add more themes here */}
//       </select>
//     </div>
//   );
// }

// 'use client';

import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';
// import { Moon, Sun, Palette } from 'lucide-react'; // optional icons

// const ThemeSwitcher = () => {
//   const { theme, setTheme } = useTheme();
//   const [colorTheme, setColorTheme] = useState('theme-light');

//   // Apply saved color theme on load
//   useEffect(() => {
//     const saved = localStorage.getItem('color-theme') || 'theme-light';
//     document.body.classList.add(saved);
//     setColorTheme(saved);
//   }, []);

//   // Switch dark/light mode
//   const handleMode = (mode) => {
//     setTheme(mode); // 'dark' or 'light'
//   };

//   // Switch color theme (orange, blue, etc.)
//   const handleColorTheme = (themeClass) => {
//     document.body.classList.remove(colorTheme);
//     document.body.classList.add(themeClass);
//     setColorTheme(themeClass);
//     localStorage.setItem('color-theme', themeClass);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       {/* Light Mode */}
//       <button
//         onClick={() => handleMode('light')}
//         className="bg-muted text-foreground px-3 py-1 rounded hover:bg-accent"
//       >
//         Light
//       </button>

//       {/* Dark Mode */}
//       <button
//         onClick={() => handleMode('dark')}
//         className="bg-muted text-foreground px-3 py-1 rounded hover:bg-accent"
//       >
//         Dark
//       </button>

//       {/* Orange Theme */}
//       <button
//         onClick={() => handleColorTheme('theme-orange')}
//         className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
//       >
//         Orange
//       </button>

//       {/* Blue Theme */}
//       <button
//         onClick={() => handleColorTheme('theme-blue')}
//         className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//       >
//         Blue
//       </button>
//     </div>
//   );
// };

// export default ThemeSwitcher;


export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-1 rounded-full border text-sm capitalize ${
            theme === t ? 'bg-white text-black' : 'bg-transparent border-white text-white'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}