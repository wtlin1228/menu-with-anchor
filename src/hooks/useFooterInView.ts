import { useRef, useEffect } from 'react'

import { data } from '../data'
import { useCategoryInViewManager } from '../managers'

export default function useFooterInView() {
  const { handleCategoryInView, executeForceRerenderFn } =
    useCategoryInViewManager()

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          handleCategoryInView(data[data.length - 1].id)
        } else {
          executeForceRerenderFn()
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
  }, [handleCategoryInView, executeForceRerenderFn])

  return { ref }
}
