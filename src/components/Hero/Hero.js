import Image from 'next/image'
import Button from '../Button'
import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.meta}>
        <span className="eyebrow">Phebian Chukwurah</span>
        <span className={styles.status}>
          <span className={styles.status__dot} aria-hidden="true" />
          Frontend Engineer
        </span>
      </div>

      <div className={styles.stage}>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}><span style={{ '--d': '0.1s' }}>Interfaces that</span></span>
          <span className={styles.line}><span style={{ '--d': '0.22s' }}>feel <em>effortless,</em></span></span>
          <span className={styles.line}><span style={{ '--d': '0.34s' }}>built with <em>care.</em></span></span>
        </h1>

        <div className={styles.portrait}>
          <div className={styles.portrait__blob}>
            <Image src="/images/me.png" alt="Portrait of Phebian Chukwurah" fill sizes="(min-width: 769px) 26vw, 60vw" priority />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.intro}>
          I&rsquo;m a software engineer with 8+ years&rsquo; experience, partnering closely with strong
          technical teams to ship accessible, responsive and performance-optimised products.
        </p>
        <div className={styles.actions}>
          <Button href="/blog" variant="glass">Read my writing</Button>
          <Button href="#contact">Get in touch <span aria-hidden="true">→</span></Button>
        </div>
      </div>
    </section>
  )
}
