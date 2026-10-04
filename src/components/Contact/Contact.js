import Magnetic from '../Magnetic'
import styles from './Contact.module.scss'

const socials = [
  { href: 'https://github.com/ph3bian', label: 'GitHub' },
  { href: 'https://x.com/ph3bian', label: 'X / Twitter' },
]

export default function Contact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <span className="eyebrow">(04) Contact</span>

      <h2 id="contact-title" className={styles.title} data-reveal>
        Let&rsquo;s make something <em>lovely</em> together.
      </h2>

      <Magnetic strength={0.35}>
        <a
          href="https://x.com/ph3bian"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.orb}
        >
          <span>Say hello</span>
          <small>@ph3bian</small>
        </a>
      </Magnetic>

      <ul className={styles.socials}>
        {socials.map(({ href, label }) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {label} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
