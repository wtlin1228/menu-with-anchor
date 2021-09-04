import { useEffect, useRef } from 'react'
import { useCategoryChipPositionManager } from '../managers'

export default function usePositionRegister(anchorId: string) {
  const ref = useRef<HTMLDivElement>(null)

  const { registerCategoryChipPosition, unregisterCategoryChipPosition } =
    useCategoryChipPositionManager()

  useEffect(() => {
    if (ref.current) {
      registerCategoryChipPosition(anchorId, ref.current.offsetLeft)
    }
    return () => unregisterCategoryChipPosition(anchorId)
  }, [anchorId, registerCategoryChipPosition, unregisterCategoryChipPosition])

  return { ref }
}
