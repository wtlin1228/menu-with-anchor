import { useRef, useEffect, useState } from 'react'
import { useSubjectsManager } from '../managers'
import { SUBJECT_KEY } from '../constants'

export default function useMenuCategoryInView(categoryId: string) {
  const ref = useRef<HTMLDivElement>(null)
  const [isFooterInView, setIsFooterInView] = useState<boolean>(false)

  const { nextValue, subscribe } = useSubjectsManager()

  useEffect(() => {
    const unsubscribe = subscribe(
      SUBJECT_KEY.footerInView$,
      (isFooterInView) => {
        setIsFooterInView(isFooterInView)
      }
    )

    return unsubscribe
  }, [subscribe])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          nextValue(SUBJECT_KEY.topCategory$, categoryId)
        }
      },
      {
        // Watch for changes only in the 1px below Header
        rootMargin: `-144px 0px ${-window.innerHeight + 144 + 1}px 0px`,
        threshold: 0,
      }
    )

    const target = ref.current
    if (target && !isFooterInView) {
      observer.observe(target)
    }
    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [categoryId, nextValue, isFooterInView])

  return { ref }
}
