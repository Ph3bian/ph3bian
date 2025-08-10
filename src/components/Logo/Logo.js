import Link from 'next/link'
import styles from './Logo.module.scss'

export default function Logo() {
  return (
    <Link className={styles.logo} href="/">
      <span className={styles.logo__text}>
        &larr; Phebian Chukwurah
      </span>
    </Link>
  )
} 