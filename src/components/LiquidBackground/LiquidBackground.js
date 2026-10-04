import { useEffect, useRef } from 'react'
import styles from './LiquidBackground.module.scss'

// Fixed, decorative layer of slow-morphing colour blobs that lean towards the pointer.
export default function LiquidBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let frame

    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth - 0.5
      target.y = e.clientY / window.innerHeight - 0.5
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.04
      pos.y += (target.y - pos.y) * 0.04
      el.style.setProperty('--px', pos.x.toFixed(4))
      el.style.setProperty('--py', pos.y.toFixed(4))
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={styles.liquid} aria-hidden="true">
      <span className={`${styles.follow} ${styles.followA}`}><span className={`${styles.blob} ${styles.blobA}`} /></span>
      <span className={`${styles.follow} ${styles.followB}`}><span className={`${styles.blob} ${styles.blobB}`} /></span>
      <span className={`${styles.follow} ${styles.followC}`}><span className={`${styles.blob} ${styles.blobC}`} /></span>
    </div>
  )
}
