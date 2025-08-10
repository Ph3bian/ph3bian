import styles from './Skills.module.scss'

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Technical Skills</h2>
          <p>A practical toolkit for building, testing, and optimising modern web applications.</p>
        </div>
        
        {/* Removed skills grid and percentage meters in favour of richer category descriptions */}
        
        <div className={styles.skillsCategories}>
          <div className={styles.category}>
            <h3>Frontend Development</h3>
            <p>Building accessible, responsive, and performant interfaces with React, TypeScript, and Next.js.</p>
            <ul>
              <li>React and Next.js with TypeScript for robust, maintainable UIs</li>
              <li>Semantic HTML and accessibility (WCAG 2.1 AA), responsive design</li>
              <li>State and data patterns suited to the problem (server rendering, client state, forms)</li>
              <li>Styling with CSS Modules/SCSS and component-driven architecture</li>
              <li>API integration (REST), routing, SSR/SSG, and form handling</li>
              <li>Tooling and DX: ESLint, Prettier, and helpful scripts</li>
            </ul>
          </div>
          <div className={styles.category}>
            <h3>Testing & Quality</h3>
            <p>Quality-first development to ensure features are implemented and extended reliably.</p>
            <ul>
              <li>Unit and integration testing with Jest and React Testing Library</li>
              <li>End-to-end testing with Cypress and Playwright</li>
              <li>Type safety with TypeScript; strict linting and consistent formatting</li>
              <li>Continuous integration to prevent regressions and ensure stable releases</li>
              <li>Clear abstractions, reviews, and documentation for long term maintainability</li>
            </ul>
          </div>
          <div className={styles.category}>
            <h3>Performance & Optimisation</h3>
            <p>Attention to detail, code quality, and user-centric performance for speed and SEO.</p>
            <ul>
              <li>Core Web Vitals focus with Lighthouse audits and bundle analysis</li>
              <li>Code splitting, lazy loading, and image optimisation strategies</li>
              <li>Efficient rendering, caching, and sensible network usage</li>
              <li>SEO fundamentals: metadata, structured data, sitemaps, and clean URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
} 