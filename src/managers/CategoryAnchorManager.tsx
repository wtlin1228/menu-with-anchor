import { createContext, useContext, useRef, useMemo, useCallback } from 'react'
import type { ReactNode } from 'react'

interface ICategoryAnchorManagerContext {
  registerCategoryAnchor: (anchorId: string, ref: Element) => void
  unregisterCategoryAnchor: (anchorId: string) => void
  getCategoryAnchor: (anchorId: string) => Element | null
}

const CategoryAnchorManagerContext = createContext(
  {} as ICategoryAnchorManagerContext
)

export const useCategoryAnchorManager = () => {
  const context = useContext(CategoryAnchorManagerContext)

  return context
}

interface ICategoryAnchorManagerProviderProps {
  children: ReactNode
}

export const CategoryAnchorManagerProvider = ({
  children,
}: ICategoryAnchorManagerProviderProps) => {
  const anchorRegistry = useRef<Record<string, Element | undefined>>({})

  const registerCategoryAnchor = useCallback(
    (anchorId: string, ref: Element): void => {
      anchorRegistry.current[anchorId] = ref
    },
    []
  )

  const unregisterCategoryAnchor = useCallback((anchorId: string): void => {
    anchorRegistry.current[anchorId] = undefined
  }, [])

  const getCategoryAnchor = useCallback((anchorId: string): Element | null => {
    const anchor = anchorRegistry.current[anchorId]

    if (!anchor) {
      return null
    }

    return anchor
  }, [])

  const manager = useMemo(
    () => ({
      registerCategoryAnchor,
      unregisterCategoryAnchor,
      getCategoryAnchor,
    }),
    [registerCategoryAnchor, unregisterCategoryAnchor, getCategoryAnchor]
  )

  return (
    <CategoryAnchorManagerContext.Provider value={manager}>
      {children}
    </CategoryAnchorManagerContext.Provider>
  )
}
