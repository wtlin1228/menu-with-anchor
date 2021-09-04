import { createContext, useContext, useRef, useMemo, useCallback } from 'react'
import type { ReactNode } from 'react'

interface ICategoryChipPositionManagerContext {
  registerCategoryChipPosition: (anchorId: string, positionX: number) => void
  unregisterCategoryChipPosition: (anchorId: string) => void
  getCategoryChipPosition: (anchorId: string) => number | null
}

const CategoryChipPositionManagerContext = createContext(
  {} as ICategoryChipPositionManagerContext
)

export const useCategoryChipPositionManager = () => {
  const context = useContext(CategoryChipPositionManagerContext)

  return context
}

interface ICategoryChipPositionManagerProviderProps {
  children: ReactNode
}

export const CategoryChipPositionManagerProvider = ({
  children,
}: ICategoryChipPositionManagerProviderProps) => {
  const anchorRegistry = useRef<Record<string, number | undefined>>({})

  const registerCategoryChipPosition = useCallback(
    (anchorId: string, positionX: number): void => {
      anchorRegistry.current[anchorId] = positionX
    },
    []
  )

  const unregisterCategoryChipPosition = useCallback(
    (anchorId: string): void => {
      anchorRegistry.current[anchorId] = undefined
    },
    []
  )

  const getCategoryChipPosition = useCallback(
    (anchorId: string): number | null => {
      const positionX = anchorRegistry.current[anchorId]

      if (!positionX) {
        return null
      }

      return positionX
    },
    []
  )

  const manager = useMemo(
    () => ({
      registerCategoryChipPosition,
      unregisterCategoryChipPosition,
      getCategoryChipPosition,
    }),
    [
      registerCategoryChipPosition,
      unregisterCategoryChipPosition,
      getCategoryChipPosition,
    ]
  )

  return (
    <CategoryChipPositionManagerContext.Provider value={manager}>
      {children}
    </CategoryChipPositionManagerContext.Provider>
  )
}
