import { Subject } from 'rxjs'

import { useCallback, useContext, useMemo, ReactNode } from 'react'
import { createContext } from 'react'

interface ICategoryInViewManagerContext {
  handleCategoryInView: (categoryUuid: string) => void
  topCategory$: Subject<string>
}

const CategoryInViewManagerContext = createContext(
  {} as ICategoryInViewManagerContext
)

export const useCategoryInViewManager = () => {
  const context = useContext(CategoryInViewManagerContext)

  return context
}

interface ICategoryInViewManagerProviderProps {
  children: ReactNode
}

export const CategoryInViewManagerProvider = ({
  children,
}: ICategoryInViewManagerProviderProps) => {
  const subject = useMemo(() => {
    return new Subject<string>()
  }, [])

  const handleCategoryInView = useCallback(
    (categoryUuid: string) => {
      subject.next(categoryUuid)
    },
    [subject]
  )

  const manager = useMemo(
    () => ({
      handleCategoryInView,
      topCategory$: subject,
    }),
    [handleCategoryInView, subject]
  )

  return (
    <CategoryInViewManagerContext.Provider value={manager}>
      {children}
    </CategoryInViewManagerContext.Provider>
  )
}
