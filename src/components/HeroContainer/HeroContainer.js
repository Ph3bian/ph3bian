import styles from './HeroContainer.module.scss'

export default function HeroContainer() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.about}>
          <div className={styles.badge}>Frontend Engineer</div>
          <h1>Chukwurah Phebian</h1>
          <p className={styles.subtitle}>
            I am a Software Engineer with over 8 years’ experience, passionate about collaborating closely with strong technical teams to build accessible, responsive, and performance optimised solutions.
          </p>
          
          <div className={styles.about__connect}>
          
            <a target="_blank" rel="noopener noreferrer" href="//github.com/ph3bian" className={styles.secondaryBtn}>
              <span>Github</span>
            </a>
            <a href="#contact" className={styles.ctaBtn}>
              <span>Get In Touch</span>
            </a>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageOverlay}></div>
        </div>
      </div>
    </section>
  )
} 