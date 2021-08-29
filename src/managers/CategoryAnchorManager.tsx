import { useContext, useRef, ReactNode } from 'react'
import { createContext } from 'react'

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

  const registerCategoryAnchor = (anchorId: string, ref: Element): void => {
    anchorRegistry.current[anchorId] = ref
  }

  const unregisterCategoryAnchor = (anchorId: string): void => {
    anchorRegistry.current[anchorId] = undefined
  }

  const getCategoryAnchor = (anchorId: string): Element | null => {
    const anchor = anchorRegistry.current[anchorId]

    if (!anchor) {
      return null
    }

    return anchor
  }

  const manager = {
    registerCategoryAnchor,
    unregisterCategoryAnchor,
    getCategoryAnchor,
  }
  return (
    <CategoryAnchorManagerContext.Provider value={manager}>
      {children}
    </CategoryAnchorManagerContext.Provider>
  )
}
