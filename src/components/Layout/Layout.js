import { useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../Navigation'
import LiquidBackground from '../LiquidBackground'
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

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Phebian Chukwurah</span>
        <span className={styles.footer__note}>Designed &amp; built with care</span>
        <Link href="#app" className={styles.footer__top}>
          Back to top ↑
        </Link>
      </footer>
    </div>
  )
}
