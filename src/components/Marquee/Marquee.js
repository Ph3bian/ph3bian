import styles from './Marquee.module.scss'

const tools = [
  'Next.js', 'React', 'TypeScript', 'Testing Library', 'Cypress', 'Playwright', 'Redux',
  'React Query', 'SWR', 'Storybook', 'Contentstack', 'Storyblok', 'Netlify', 'Datadog',
]

export default function Marquee() {
  const items = [...tools, ...tools]
  return (
    <section className={styles.band} aria-label="Tools I work with">
      <ul className="visually-hidden">
        {tools.map((tool) => <li key={tool}>{tool}</li>)}
      </ul>
      <div className={styles.track} aria-hidden="true">
        {items.map((tool, i) => (
          <span key={i} className={styles.item}>
            {tool}
            <span className={styles.star}>✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
