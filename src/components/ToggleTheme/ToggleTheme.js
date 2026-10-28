import { useSyncExternalStore } from 'react'
import styles from './ToggleTheme.module.scss'

// The theme lives on <html data-theme> (set before first paint in _document.js);
// subscribing to that attribute keeps the icon in sync wherever the theme changes.
function subscribe(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'

export default function ToggleTheme() {
  const darkTheme = useSyncExternalStore(subscribe, isDark, () => false)

  const toggleTheme = () => {
    const next = darkTheme ? 'light' : 'dark'
    try {
      localStorage.setItem('theme', next)
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button 
      role="button" 
      aria-label="Toggle dark/light" 
      onClick={toggleTheme} 
      className={styles.toggleTheme}
    >
      {darkTheme ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  )
} 