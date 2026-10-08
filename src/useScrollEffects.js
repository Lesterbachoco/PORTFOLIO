import { useEffect } from 'react'
import Lenis from 'lenis'

// true = items pop again every time you scroll back up and down past them
const REPLAY = false

// [selector, animation, stagger in ms, items per row, pop the card's contents too]
const GROUPS = [
  ['main section:not(#home) > h2', 'up', 120, 2, false],
  ['main section:not(#home) > h2 + p', 'up', 120, 2, false],
  ['#about article', 'up', 160, 3, true],
  ['#stack li', 'zoom', 80, 5, true],
  ['#projects [role=tablist]', 'up', 0, 1, true],
  ['#projects article', 'up', 140, 2, true],
  ['#insights a', 'up', 140, 3, true],
  ['#faq .space-y-3 > div', 'up', 0, 1, false],
  ['#contact form', 'left', 0, 1, true],
  ['#contact aside', 'right', 150, 2, true],
]

export function useScrollEffects() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    root.classList.add('motion')

    // 1. Smooth inertia scrolling, plus smooth anchor links that stop below the sticky nav
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 })
    const onClick = (e) => {
      const id = e.target.closest('a[href^="#"]')?.getAttribute('href')
      const target = id && id.length > 1 ? document.querySelector(id) : null
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -88, duration: 1.3 })
    }
    document.addEventListener('click', onClick)

    // 2. Scroll-triggered reveal with stagger (also catches cards that appear later)
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        if (!REPLAY) io.unobserve(e.target)
      } else if (REPLAY && e.boundingClientRect.top > 0) {
        e.target.classList.remove('in')   // it is below the screen again, so it can pop again
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    const scan = () => GROUPS.forEach(([sel, kind, step, cols, kids]) =>
      document.querySelectorAll(sel).forEach((el) => {
        if (el.classList.contains('in')) return
        if (!el.classList.contains('reveal')) {
          const i = [...el.parentElement.children].indexOf(el)
          el.style.setProperty('--d', `${(i % cols) * step}ms`)
          el.classList.add('reveal', `reveal-${kind}`)
          if (kids) el.classList.add('reveal-kids')
        }
        io.observe(el)
      }))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.getElementById('root'), { childList: true, subtree: true })

    // 3. Sticky nav: active link as you scroll (scroll-spy)
    const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return
      document.querySelectorAll('header ul a').forEach((a) =>
        a.toggleAttribute('data-active', a.getAttribute('href') === `#${e.target.id}`))
    }), { rootMargin: '-45% 0px -50% 0px' })
    document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s))

    // 4. One scroll loop drives parallax, the progress bar, and hide/show nav
    let raf = 0, last = 0
    const update = () => {
      raf = 0
      const y = scrollY, h = innerHeight
      root.style.setProperty('--sy', Math.min(y, 1200))
      root.style.setProperty('--p', (y / Math.max(1, root.scrollHeight - h)).toFixed(4))
      root.toggleAttribute('data-scrolled', y > 40)
      const menuOpen = document.querySelector('header [aria-expanded="true"]')
      if (y > last + 4 && y > 160 && !menuOpen) root.setAttribute('data-nav-hidden', '')
      else if (y < last - 4 || y <= 160) root.removeAttribute('data-nav-hidden')
      last = y
      document.querySelectorAll('main section:not(#home)').forEach((s) => {
        const r = s.getBoundingClientRect()
        if (r.bottom < -300 || r.top > h + 300) return
        const v = ((r.top + r.height / 2 - h / 2) / h) * 100
        s.style.setProperty('--py', Math.max(-150, Math.min(150, v)).toFixed(1))
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })

    return () => {
      lenis.destroy(); io.disconnect(); mo.disconnect(); spy.disconnect()
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      removeEventListener('scroll', onScroll)
      root.classList.remove('motion')
    }
  }, [])
}
