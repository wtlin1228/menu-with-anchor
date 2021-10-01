import { useRef, useEffect } from 'react'

import { useSubjectsManager } from '../managers'
import { SUBJECT_KEY } from '../constants'

export default function useFooterInView() {
  const ref = useRef<HTMLElement>(null)

  const { nextValue } = useSubjectsManager()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          nextValue(SUBJECT_KEY.footerInView$, true)
        } else {
          nextValue(SUBJECT_KEY.footerInView$, false)
        }
      },
      {
        threshold: 1,
      }
    )

    const target = ref.current
    if (target) {
      observer.observe(target)
    }
    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [nextValue])

  return { ref }
}
