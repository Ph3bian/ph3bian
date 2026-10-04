import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ToggleTheme from '../ToggleTheme'
import styles from './Navigation.module.scss'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#craft', label: 'Craft' },
  { href: '/blog', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { pathname } = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.bar} aria-label="Primary">
        <Link href="/" className={styles.logo} aria-label="Phebian Chukwurah, home">
          <span className={styles.logo__mark}>P</span>
          <span className={styles.logo__text}>Phebian<em>.</em></span>
        </Link>

        <ul className={styles.links}>
          {links.map(({ href, label }) => {
            const active = href === '/blog' && pathname.startsWith('/blog')
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${active ? styles.active : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <ToggleTheme />
      </nav>
    </header>
  )
}
