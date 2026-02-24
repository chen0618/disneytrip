import { useState, useLayoutEffect } from 'react';

export default function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      // localStorage unavailable
    }
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}
