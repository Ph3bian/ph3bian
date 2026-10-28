import { useEffect, useRef } from 'react'
import styles from './LiquidScene.module.scss'

const vertex = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

// Domain-warped noise mapped onto a pink, blush, lilac and grey palette,
// with a moving specular sheen so it reads as liquid rather than a gradient.
const fragment = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uDark;
uniform float uSeed;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y) + uSeed;
  vec2 m = vec2(uMouse.x * aspect, uMouse.y) + uSeed;
  float t = uTime * 0.06;

  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 3.1));
  vec2 r = vec2(
    fbm(p * 1.5 + 2.0 * q + vec2(1.7, 9.2) + t * 1.4),
    fbm(p * 1.5 + 2.0 * q + vec2(8.3, 2.8) - t)
  );
  // The pointer stirs the liquid
  r += (m - p) * 0.35 * exp(-distance(p, m) * 2.6);
  float f = fbm(p * 2.2 + 3.0 * r);

  vec3 base = mix(vec3(0.992, 0.980, 0.988), vec3(0.17, 0.155, 0.17), uDark);
  vec3 blush = mix(vec3(0.985, 0.80, 0.895), vec3(0.36, 0.20, 0.31), uDark);
  vec3 pink = mix(vec3(0.925, 0.36, 0.73), vec3(0.95, 0.45, 0.78), uDark);
  vec3 lilac = mix(vec3(0.89, 0.86, 0.96), vec3(0.27, 0.24, 0.33), uDark);
  vec3 grey = mix(vec3(0.80, 0.78, 0.80), vec3(0.42, 0.40, 0.43), uDark);

  vec3 shade = mix(vec3(0.74, 0.66, 0.72), vec3(0.11, 0.09, 0.11), uDark);

  vec3 col = mix(base, blush, smoothstep(-0.3, 0.5, f));
  col = mix(col, lilac, smoothstep(0.2, 0.9, length(q)) * 0.55);
  col = mix(col, grey, smoothstep(0.25, 0.85, r.y) * 0.4);
  col = mix(col, pink, smoothstep(0.42, 0.95, f + r.x * 0.35) * 0.62);
  // Shadowed folds give the silk its depth
  float fold = smoothstep(0.15, -0.45, f - r.y * 0.4);
  col = mix(col, shade, fold * 0.45);

  // Glossy highlights travelling across the surface
  float sheen = pow(max(0.0, sin((f + r.x) * 8.0 + t * 7.0)), 14.0);
  col = mix(col, vec3(1.0), sheen * mix(0.38, 0.14, uDark));

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl, type, src) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

// Full-bleed animated scene that melts into the page at the `fade` edges. Pass `video` (a looping clip, e.g. exported from Higgsfield)
// to play footage over the live liquid; the liquid stays as the fallback and poster.
export default function LiquidScene({ video, poster, fade = 'top', seed = 0, bleed = false, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, vertex)
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragment)
    if (!vs || !fs) return
    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uRes')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uMouse = gl.getUniformLocation(program, 'uMouse')
    const uDark = gl.getUniformLocation(program, 'uDark')
    gl.uniform1f(gl.getUniformLocation(program, 'uSeed'), seed)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: 0.7, y: 0.35 }
    const target = { x: 0.7, y: 0.35 }
    let dark = 0
    let frame
    let visible = false
    const start = performance.now() - 20000

    const readTheme = () => {
      dark = document.documentElement.getAttribute('data-theme') === 'dark' ? 1 : 0
    }

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const draw = (now) => {
      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uDark, dark)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const loop = (now) => {
      draw(now)
      if (visible && !reduced) frame = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      target.x = (e.clientX - rect.left) / rect.width
      target.y = 1 - (e.clientY - rect.top) / rect.height
    }

    readTheme()
    resize()
    draw(performance.now())

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible && !reduced) frame = requestAnimationFrame(loop)
    })
    io.observe(canvas)
    const themeObserver = new MutationObserver(() => {
      readTheme()
      draw(performance.now())
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [seed])

  return (
    <div className={`${styles.scene} ${styles[`fade-${fade}`] || ''} ${bleed ? styles.bleed : ''} ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      {video && (
        <video className={styles.video} src={video} poster={poster} autoPlay muted loop playsInline preload="metadata" />
      )}
    </div>
  )
}
