import styles from './Craft.module.scss'

const services = [
  {
    title: 'Frontend Development',
    body: 'Accessible, responsive, performant interfaces with React, TypeScript and Next.js. Component-driven, semantic, and built to scale with the team.',
    tags: ['React', 'Next.js', 'TypeScript', 'SSR / SSG', 'SCSS Modules', 'REST APIs'],
  },
  {
    title: 'Testing & Quality',
    body: 'Quality-first development so features can be shipped and extended with confidence, from unit tests to end-to-end journeys in CI.',
    tags: ['Jest', 'Testing Library', 'Cypress', 'Playwright', 'CI/CD'],
  },
  {
    title: 'Performance & SEO',
    body: 'User-centric speed. Core Web Vitals, bundle budgets, smart loading and caching, plus the metadata and structure search engines love.',
    tags: ['Lighthouse', 'Code splitting', 'Image optimisation', 'Structured data'],
  },
]

export default function Craft() {
  return (
    <section id="craft" className={styles.craft} aria-labelledby="craft-title">
      <header className={styles.header}>
        <span className="eyebrow">(02) Craft</span>
        <h2 id="craft-title" data-reveal>
          What I bring <em>to the table.</em>
        </h2>
      </header>

      <ol className={styles.list}>
        {services.map(({ title, body, tags }, i) => (
          <li key={title} className={styles.row} data-reveal>
            <span className={styles.index}>0{i + 1}</span>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.detail}>
              <p>{body}</p>
              <p className={styles.tags}>{tags.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
