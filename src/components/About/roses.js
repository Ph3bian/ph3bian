// Long-stemmed roses: each stem is a gentle curve that ends in a layered bloom (or a bud),
// with paired leaves and a few thorns along the way. Every part carries a
// [start, duration] window on a 0–1 growth timeline so scroll progress can drive it.

function random(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const quad = (a, c, b, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b
const quadSlope = (a, c, b, t) => 2 * (1 - t) * (c - a) + 2 * t * (b - c)
const deg = (rad) => (rad * 180) / Math.PI

// Rounded rose petal, base at the origin, opening upwards
const petal = (s) =>
  `M0 0 C${(-s * 0.62).toFixed(1)} ${(-s * 0.18).toFixed(1)} ${(-s * 0.74).toFixed(1)} ${(-s * 0.95).toFixed(1)} 0 ${(-s * 1.02).toFixed(1)} C${(s * 0.74).toFixed(1)} ${(-s * 0.95).toFixed(1)} ${(s * 0.62).toFixed(1)} ${(-s * 0.18).toFixed(1)} 0 0 Z`

// Rings of petals from the outside in; each ring is one path
export function roseRings(size, seed) {
  const rand = random(seed)
  const rings = [
    { count: 5, scale: 1, offset: 0.14 },
    { count: 5, scale: 0.8, offset: 0.09 },
    { count: 4, scale: 0.62, offset: 0.05 },
    { count: 4, scale: 0.46, offset: 0.02 },
    { count: 3, scale: 0.32, offset: 0 },
  ]
  return rings.map((ring, k) => {
    const s = size * ring.scale
    const turn = rand() * 360 + k * 31
    const petals = Array.from({ length: ring.count }, (_, i) => ({
      d: petal(s),
      transform: `rotate(${(turn + (i / ring.count) * 360).toFixed(1)}) translate(0 ${(-size * ring.offset).toFixed(1)})`,
    }))
    return { petals, turn }
  })
}

function stem(rand, { x0, y0, angle, length, start, dur, bloom }) {
  const x1 = x0 + Math.cos(angle) * length
  const y1 = y0 + Math.sin(angle) * length
  const bend = (rand() - 0.5) * length * 0.22
  const cx = (x0 + x1) / 2 + Math.cos(angle + Math.PI / 2) * bend
  const cy = (y0 + y1) / 2 + Math.sin(angle + Math.PI / 2) * bend
  return { x0, y0, cx, cy, x1, y1, start, dur, bloom }
}

export function growRoses(configs) {
  const stems = []
  const leaves = []
  const thorns = []
  const blooms = []

  configs.forEach(({ x, y, angle, length, seed, sides = [] }) => {
    const rand = random(seed)
    const main = stem(rand, { x0: x, y0: y, angle, length, start: 0, dur: 0.55, bloom: { size: 50 + rand() * 10 } })
    const all = [main]
    sides.forEach((side) => {
      const t = side.at
      all.push(
        stem(rand, {
          x0: quad(main.x0, main.cx, main.x1, t),
          y0: quad(main.y0, main.cy, main.y1, t),
          angle: angle + side.turn,
          length: side.length,
          start: main.dur * t,
          dur: 0.32,
          bloom: side.bud ? { bud: true, size: 18 + rand() * 4 } : { size: 34 + rand() * 8 },
        }),
      )
    })

    all.forEach((s, si) => {
      stems.push({
        d: `M${s.x0.toFixed(1)} ${s.y0.toFixed(1)} Q${s.cx.toFixed(1)} ${s.cy.toFixed(1)} ${s.x1.toFixed(1)} ${s.y1.toFixed(1)}`,
        width: si === 0 ? 5 : 3.5,
        start: s.start,
        dur: s.dur,
      })
      const at = (t) => ({
        x: quad(s.x0, s.cx, s.x1, t),
        y: quad(s.y0, s.cy, s.y1, t),
        slope: Math.atan2(quadSlope(s.y0, s.cy, s.y1, t), quadSlope(s.x0, s.cx, s.x1, t)),
      })

      // Leaves come in pairs, one either side of the stem
      const pairs = si === 0 ? [0.3, 0.58] : [0.5]
      pairs.forEach((t) => {
        const p = at(t)
        ;[-1, 1].forEach((side) => {
          leaves.push({
            x: p.x,
            y: p.y,
            rotate: deg(p.slope + side * (0.85 + rand() * 0.25)),
            size: (si === 0 ? 30 : 24) + rand() * 6,
            start: s.start + s.dur * t,
            dur: 0.1,
          })
        })
      })

      ;[0.16, 0.44, 0.72].forEach((t, k) => {
        if (si > 0 && k === 0) return
        const p = at(t)
        thorns.push({
          x: p.x,
          y: p.y,
          rotate: deg(p.slope) + (k % 2 ? 90 : -90),
          start: s.start + s.dur * t,
          dur: 0.06,
        })
      })

      blooms.push({
        x: s.x1,
        y: s.y1,
        rotate: deg(at(1).slope) + 90,
        ...s.bloom,
        seed: seed * 10 + si,
        start: s.start + s.dur,
        dur: s.bloom.bud ? 0.12 : 0.22,
      })
    })
  })

  const end = Math.max(...blooms.map((b) => b.start + b.dur))
  const scale = (o) => ({ ...o, start: o.start / end, dur: o.dur / end })
  return { stems: stems.map(scale), leaves: leaves.map(scale), thorns: thorns.map(scale), blooms: blooms.map(scale) }
}

// The tight spiral at the heart of a rose
export function roseSpiral(size) {
  const turns = 2.6
  const steps = 48
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = t * turns * Math.PI * 2
    const r = size * 0.04 + size * 0.24 * t
    d += `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r * 0.85).toFixed(1)} `
  }
  return d
}
