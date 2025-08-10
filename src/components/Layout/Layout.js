import Navigation from '../Navigation'
import styles from './Layout.module.scss'

export default function Layout({ children, showLogo = true }) {
  return (
    <div id="app">
      <Navigation showLogo={showLogo} />
      
      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <span className={styles.footer__copyright}>
          Copyright © {new Date().getFullYear()}. Phebian Chukwurah
        </span>
      </footer>
    </div>
  )
} 