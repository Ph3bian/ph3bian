import { useEffect } from 'react'
import Navigation from '../Navigation'
import LiquidBackground from '../LiquidBackground'
import Footer from '../Footer'
import styles from './Layout.module.scss'

export default function Layout({ children }) {
  // Reveal any [data-reveal] element as it scrolls into view
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not([data-visible])')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', '')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [children])

  return (
    <div id="app" className={styles.app}>
      <a href="#main" className={styles.skip}>Skip to content</a>
      <LiquidBackground />
      <Navigation />

      <main id="main" className={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  )
}
