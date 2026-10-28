import LiquidScene from '../LiquidScene'
import styles from './Principles.module.scss'

const principles = [
  {
    title: 'Accessible by default',
    body: 'Semantic HTML, keyboard paths and WCAG 2.1 AA from the first commit, never bolted on at the end.',
  },
  {
    title: 'Fast by design',
    body: 'Performance budgets, lean bundles and Core Web Vitals treated as product features, not afterthoughts.',
  },
  {
    title: 'Built to last',
    body: 'Typed, tested and documented, so teams can keep shipping with confidence long after launch.',
  },
]

// Immersive interlude between About and Craft
export default function Principles() {
  return (
    <section className={styles.principles} aria-labelledby="principles-title">
      <LiquidScene fade="both" seed={7.3} bleed />

      <div className={styles.inner}>
        <span className={styles.eyebrow}>Principles</span>
        <h2 id="principles-title" className={styles.title} data-reveal>
          Quiet interfaces that <em>just work,</em> for everyone.
        </h2>

        <ul className={styles.cards}>
          {principles.map(({ title, body }, i) => (
            <li key={title} className={styles.card} data-reveal style={{ '--reveal-delay': `${0.1 + i * 0.12}s` }}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
