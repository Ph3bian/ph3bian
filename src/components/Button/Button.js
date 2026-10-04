import Link from 'next/link'
import styles from './Button.module.scss'

// Pill button whose fill pours in from wherever the pointer enters.
export default function Button({ href, children, variant = 'solid', external, className = '', ...rest }) {
  const setOrigin = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  const props = {
    className: `${styles.button} ${styles[variant]} ${className}`,
    onMouseEnter: setOrigin,
    onMouseLeave: setOrigin,
    ...rest,
  }

  const content = (
    <>
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {content}
    </Link>
  )
}
