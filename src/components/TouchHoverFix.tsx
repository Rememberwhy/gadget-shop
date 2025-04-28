'use client'

import { useEffect } from 'react'

export default function TouchHoverFix() {
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const allHoverables = document.querySelectorAll('.hoverable.hovered')
      allHoverables.forEach(el => el.classList.remove('hovered')) // remove from all

      let target = e.target as HTMLElement

      while (target && !target.classList.contains('hoverable')) {
        target = target.parentElement as HTMLElement
      }

      if (target) {
        target.classList.add('hovered')
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return null
}
