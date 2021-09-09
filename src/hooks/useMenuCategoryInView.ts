import { useRef, useEffect } from 'react'

export default function useMenuCategoryInView({
  callback = () => {},
  reset,
}: {
  callback: () => void
  reset: object
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      },
      {
        // Watch for changes only in the 1px below Header
        rootMargin: `-144px 0px ${-window.innerHeight + 144 + 1}px 0px`,
        threshold: 0,
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
  }, [callback, reset]) // TODO: should not use dependency to implement business logic

  return { ref }
}
