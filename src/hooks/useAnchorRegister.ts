import { useEffect, useRef } from 'react'

import { useCategoryAnchorManager } from '../managers'

export default function useAnchorRegister(anchorId: string) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { registerCategoryAnchor, unregisterCategoryAnchor } =
    useCategoryAnchorManager()

  useEffect(() => {
    if (ref.current) {
      registerCategoryAnchor(anchorId, ref.current)
    }
    return () => unregisterCategoryAnchor(anchorId)
  }, [anchorId, registerCategoryAnchor, unregisterCategoryAnchor])

  return { ref }
}
