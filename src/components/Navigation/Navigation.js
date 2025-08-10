import { useState, useEffect } from 'react'
import Link from 'next/link'
import ToggleTheme from '../ToggleTheme'
import styles from './Navigation.module.scss'

export default function Navigation({ showLogo = true }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.sticky : ''}`}>
      <div className={styles.header__left}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        {/* <Link href="/blog" className={styles.navLink}>
          Blog
        </Link> */}
      </div>

      <div className={styles.header__right}>
        <ToggleTheme />
      </div>
    </header>
  )
} 