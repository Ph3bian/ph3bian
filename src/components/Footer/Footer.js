import Link from 'next/link'
import LiquidScene from '../LiquidScene'
import Magnetic from '../Magnetic'
import styles from './Footer.module.scss'

// Drop a looping clip (e.g. exported from Higgsfield) into /public/videos and set it here.
const SCENE_VIDEO = null
const SCENE_POSTER = undefined

const links = [
  { href: '/blog', label: 'Writing' },
  { href: 'https://github.com/ph3bian', label: 'GitHub', external: true },
  { href: 'https://x.com/ph3bian', label: 'X / Twitter', external: true },
]

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer} aria-labelledby="contact-title">
      <LiquidScene video={SCENE_VIDEO} poster={SCENE_POSTER} />

      <div className={styles.content}>
        <span className={styles.eyebrow}>Contact</span>
        <h2 id="contact-title" className={styles.title} data-reveal>
          Let&rsquo;s make something <em>lovely</em> together.
        </h2>
        <p className={styles.lede} data-reveal style={{ '--reveal-delay': '0.1s' }}>
          Open to thoughtful frontend work, collaborations and good conversations about the web.
        </p>
        <div data-reveal style={{ '--reveal-delay': '0.2s' }}>
          <Magnetic strength={0.3}>
            <a href="https://x.com/ph3bian" target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Say hello <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className={styles.bar}>
        <span>© {new Date().getFullYear()} Phebian Chukwurah</span>
        <ul className={styles.links}>
          {links.map(({ href, label, external }) => (
            <li key={href}>
              {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer">{label} <span aria-hidden="true">↗</span></a>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          ))}
          <li>
            <a href="#app">Back to top <span aria-hidden="true">↑</span></a>
          </li>
        </ul>
      </div>

      <div className={styles.word} aria-hidden="true">Phebian</div>
    </footer>
  )
}
