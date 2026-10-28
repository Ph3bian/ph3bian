import { useEffect, useMemo, useRef } from 'react'
import { growRoses, roseRings, roseSpiral } from './roses'
import styles from './About.module.scss'

const statement =
  'I care about the small things: the focus ring, the loading state, the millisecond saved. I build interfaces that are accessible to everyone, kind on slow networks, and a joy to maintain long after launch.'

const stats = [
  { value: '8+', label: 'Years building for the web' },
  { value: 'AA', label: 'WCAG 2.1 accessibility, built in' },
  { value: 'CWV', label: 'Core Web Vitals treated as a feature' },
]

// Long-stemmed roses rising from the bottom corners, framing the statement
const roseConfigs = [
  {
    x: 190,
    y: 1010,
    angle: -Math.PI / 2 + 0.1,
    length: 500,
    seed: 11,
    sides: [
      { at: 0.45, turn: -0.55, length: 200 },
      { at: 0.7, turn: 0.5, length: 120, bud: true },
    ],
  },
  { x: 80, y: 1010, angle: -Math.PI / 2 + 0.2, length: 330, seed: 5 },
  {
    x: 840,
    y: 1010,
    angle: -Math.PI / 2 - 0.12,
    length: 440,
    seed: 29,
    sides: [{ at: 0.5, turn: 0.55, length: 170 }],
  },
  {
    x: 950,
    y: 1010,
    angle: -Math.PI / 2 - 0.22,
    length: 290,
    seed: 17,
    sides: [{ at: 0.6, turn: -0.5, length: 100, bud: true }],
  },
]

const LEAF = 'M0 0 C 7 -8 19 -8 26 0 C 19 8 7 8 0 0 Z'
const THORN = 'M-2 0 L0 -5 L2 0 Z'
const RING_FILLS = ['rose-outer', 'rose-mid', 'rose-inner', 'rose-heart', 'rose-heart']
const clamp = (v) => Math.min(1, Math.max(0, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

export default function About() {
  const trackRef = useRef(null)
  const pinRef = useRef(null)
  const textRef = useRef(null)
  const stemRefs = useRef([])
  const leafRefs = useRef([])
  const thornRefs = useRef([])
  const bloomRefs = useRef([])
  const ringRefs = useRef([])
  const words = statement.split(' ')

  const { stems, leaves, thorns, blooms } = useMemo(() => {
    const garden = growRoses(roseConfigs)
    garden.blooms = garden.blooms.map((b) => ({ ...b, rings: b.bud ? [] : roseRings(b.size, b.seed) }))
    return garden
  }, [])

  // Scroll drives everything: stems draw, leaves unfurl, blooms open, words light up
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const last = new Map()
    let frame

    const set = (el, key, value) => {
      if (!el || last.get(el) === value) return
      last.set(el, value)
      if (key === 'offset') el.style.strokeDashoffset = value
      else el.setAttribute('transform', value)
    }

    const render = (p) => {
      // Growth runs over the first 80% of the pinned scroll
      const g = clamp(p / 0.8)
      stems.forEach((s, i) => {
        set(stemRefs.current[i], 'offset', (1 - clamp((g - s.start) / s.dur)).toFixed(3))
      })
      leaves.forEach((l, i) => {
        const k = easeOut(clamp((g - l.start) / l.dur))
        set(
          leafRefs.current[i],
          'transform',
          `translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.rotate.toFixed(1)}) scale(${((k * l.size) / 24).toFixed(3)})`,
        )
      })
      thorns.forEach((t, i) => {
        const k = clamp((g - t.start) / t.dur)
        set(
          thornRefs.current[i],
          'transform',
          `translate(${t.x.toFixed(1)} ${t.y.toFixed(1)}) rotate(${t.rotate.toFixed(1)}) scale(${k.toFixed(3)})`,
        )
      })
      blooms.forEach((b, i) => {
        const k = easeOut(clamp((g - b.start) / b.dur))
        set(
          bloomRefs.current[i],
          'transform',
          `translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${b.rotate.toFixed(1)}) scale(${(k ? 0.35 + 0.65 * k : 0).toFixed(3)})`,
        )
        // Outer petals open first, then each ring inside unfurls in turn
        b.rings.forEach((ring, r) => {
          const kr = easeOut(clamp(k * 1.5 - r * 0.18))
          set(
            ringRefs.current[i]?.[r],
            'transform',
            `rotate(${(-40 * (1 - kr)).toFixed(1)}) scale(${(0.45 + 0.55 * kr).toFixed(3)})`,
          )
        })
      })
      textRef.current?.style.setProperty('--p', clamp(p / 0.5).toFixed(3))
      pinRef.current?.classList.toggle(styles.bloomed, g >= 1)
    }

    const update = () => {
      const rect = track.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      render(reduced ? 1 : clamp(-rect.top / travel))
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    // Wind: plants lean towards the pointer
    const onMove = (e) => {
      const w = (e.clientX / window.innerWidth - 0.5) * 2
      pinRef.current?.style.setProperty('--wind', w.toFixed(3))
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    if (!reduced) window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onMove)
    }
  }, [stems, leaves, thorns, blooms])

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div ref={trackRef} className={styles.track}>
        <div ref={pinRef} className={styles.pin}>
          <svg
            className={styles.garden}
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="leaf-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--leaf-light)" />
                <stop offset="1" stopColor="var(--leaf-dark)" />
              </linearGradient>
              <radialGradient id="rose-outer" cx="0.5" cy="1" r="1">
                <stop offset="0" stopColor="#f6a9cf" />
                <stop offset="1" stopColor="#ffe4f1" />
              </radialGradient>
              <radialGradient id="rose-mid" cx="0.5" cy="1" r="1">
                <stop offset="0" stopColor="#ee7fbb" />
                <stop offset="1" stopColor="#ffc6e2" />
              </radialGradient>
              <radialGradient id="rose-inner" cx="0.5" cy="1" r="1">
                <stop offset="0" stopColor="#d9469a" />
                <stop offset="1" stopColor="#f59bc9" />
              </radialGradient>
              <radialGradient id="rose-heart" cx="0.5" cy="1" r="1">
                <stop offset="0" stopColor="#b8307f" />
                <stop offset="1" stopColor="#e86aae" />
              </radialGradient>
            </defs>

            <g className={styles.wind}>
              <g className={styles.sway}>
                {stems.map((s, i) => (
                  <path
                    key={`s${i}`}
                    ref={(el) => (stemRefs.current[i] = el)}
                    d={s.d}
                    pathLength="1"
                    className={styles.stem}
                    style={{ strokeWidth: s.width, strokeDashoffset: 1 }}
                  />
                ))}
                {thorns.map((t, i) => (
                  <path
                    key={`t${i}`}
                    ref={(el) => (thornRefs.current[i] = el)}
                    d={THORN}
                    className={styles.thorn}
                    transform="scale(0)"
                  />
                ))}
                {leaves.map((l, i) => (
                  <g key={`l${i}`} ref={(el) => (leafRefs.current[i] = el)} transform="scale(0)">
                    <path d={LEAF} className={styles.leaf} />
                    <path d="M1 0 L24 0" className={styles.vein} />
                  </g>
                ))}
                {blooms.map((b, i) => (
                  <g key={`b${i}`} ref={(el) => (bloomRefs.current[i] = el)} transform="scale(0)">
                    {b.bud ? (
                      <>
                        <path
                          d={`M0 0 C ${-b.size * 0.7} ${-b.size * 0.6} ${-b.size * 0.3} ${-b.size * 1.5} 0 ${-b.size * 1.6} C ${b.size * 0.3} ${-b.size * 1.5} ${b.size * 0.7} ${-b.size * 0.6} 0 0 Z`}
                          fill="url(#rose-mid)"
                        />
                        <path
                          d={`M0 0 C ${-b.size * 0.6} ${-b.size * 0.2} ${-b.size * 0.5} ${-b.size * 0.8} ${-b.size * 0.15} ${-b.size * 1.1} C ${-b.size * 0.2} ${-b.size * 0.6} 0 ${-b.size * 0.3} 0 0 M0 0 C ${b.size * 0.6} ${-b.size * 0.2} ${b.size * 0.5} ${-b.size * 0.8} ${b.size * 0.15} ${-b.size * 1.1} C ${b.size * 0.2} ${-b.size * 0.6} 0 ${-b.size * 0.3} 0 0`}
                          className={styles.sepal}
                        />
                      </>
                    ) : (
                      <>
                        {b.rings.map((ring, r) => (
                          <g
                            key={r}
                            ref={(el) => {
                              ringRefs.current[i] = ringRefs.current[i] || []
                              ringRefs.current[i][r] = el
                            }}
                            fill={`url(#${RING_FILLS[r]})`}
                            className={styles.ring}
                          >
                            {ring.petals.map((p, k) => (
                              <path key={k} d={p.d} transform={p.transform} />
                            ))}
                          </g>
                        ))}
                        <path d={roseSpiral(b.size)} className={styles.swirl} />
                      </>
                    )}
                  </g>
                ))}
              </g>
            </g>
          </svg>

          <div className={styles.petals} aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{ '--i': i, '--d': (i * 7) % 10 }} />
            ))}
          </div>

          <div className={styles.copy}>
            <span className={styles.eyebrow}>About</span>
            <h2 id="about-title" className="visually-hidden">
              About
            </h2>
            <p ref={textRef} className={styles.statement} style={{ '--n': words.length }} aria-label={statement}>
              {words.map((word, i) => (
                <span key={i} style={{ '--i': i }} aria-hidden="true">
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <dl className={styles.stats}>
        {stats.map(({ value, label }, i) => (
          <div key={value} className={styles.stat} data-reveal style={{ '--reveal-delay': `${i * 0.12}s` }}>
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
