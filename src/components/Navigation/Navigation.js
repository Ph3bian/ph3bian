import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ToggleTheme from '../ToggleTheme'
import styles from './Navigation.module.scss'

// `section` is the homepage section each link tracks while scrolling
const links = [
  { href: '/#about', label: 'About', section: 'about' },
  { href: '/#craft', label: 'Craft', section: 'craft' },
  { href: '/blog', label: 'Writing', section: 'writing' },
  { href: '/#contact', label: 'Contact', section: 'contact' },
]

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function Navigation() {
  const { pathname } = useRouter()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [section, setSection] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [blob, setBlob] = useState({ x: 0, w: 0, visible: false })
  const listRef = useRef(null)
  const linkRefs = useRef([])

  const active = pathname.startsWith('/blog') ? 2 : isHome ? links.findIndex((l) => l.section === section) : -1
  const target = hovered ?? (active >= 0 ? active : null)

  // Glass pill once scrolled; slide away on scroll down, drop back in on scroll up
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setIsScrolled(y > 24)
      if (Math.abs(y - lastY) > 6) {
        setIsHidden(y > lastY && y > 320)
        lastY = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy: the blob follows whichever homepage section is in view
  useEffect(() => {
    if (!isHome) {
      setSection(null)
      return
    }
    const els = links.map((l) => document.getElementById(l.section)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => observer.observe(el))
    const onTop = () => window.scrollY < window.innerHeight * 0.5 && setSection(null)
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [isHome])

  const measure = useCallback(() => {
    const el = target != null ? linkRefs.current[target] : null
    setBlob((prev) => (el ? { x: el.offsetLeft, w: el.offsetWidth, visible: true } : { ...prev, visible: false }))
  }, [target])

  useIsoLayoutEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const blobStyle = { '--x': `${blob.x}px`, '--w': `${blob.w}px` }

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}
      onFocusCapture={() => setIsHidden(false)}
    >
      <nav className={styles.bar} aria-label="Primary">
        <Link href="/" className={styles.logo} aria-label="Phebian Chukwurah, home">
          <span className={styles.logo__mark} aria-hidden="true">P</span>
          <span className={styles.logo__text}>Phebian<em>.</em></span>
        </Link>

        <div className={styles.links} ref={listRef} onMouseLeave={() => setHovered(null)}>
          {/* Liquid layer: a blob and a lagging droplet, merged by the goo filter */}
          <div className={`${styles.liquid} ${blob.visible ? styles.liquidOn : ''}`} style={blobStyle} aria-hidden="true">
            <span className={styles.blob} />
            <span className={styles.drop} />
          </div>

          <ul>
            {links.map(({ href, label }, i) => (
              <li key={href}>
                <Link
                  href={href}
                  ref={(el) => (linkRefs.current[i] = el)}
                  className={`${styles.link} ${target === i ? styles.on : ''}`}
                  aria-current={active === i && !isHome ? 'page' : undefined}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ToggleTheme />
      </nav>

      <svg className={styles.filters} aria-hidden="true" focusable="false">
        <filter id="nav-goo" x="-20%" y="-50%" width="140%" height="200%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
    </header>
  )
}
