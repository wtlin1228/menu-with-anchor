import { Subject } from 'rxjs'

import { useRef, useCallback, useContext, useMemo, ReactNode } from 'react'
import { createContext } from 'react'

interface ICategoryInViewManagerContext {
  handleCategoryInView: (categoryId: string) => void
  registerForceRerenderFn: (fn: () => void) => void
  executeForceRerenderFn: () => void
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
  const forceRerenderFnRef = useRef<() => void>(() => {})

  const subjectRef = useRef(new Subject<string>())

  const handleCategoryInView = useCallback(
    (categoryId: string) => {
      subjectRef.current.next(categoryId)
    },
    [subjectRef]
  )

  const registerForceRerenderFn = useCallback((fn) => {
    forceRerenderFnRef.current = fn
  }, [])

  const executeForceRerenderFn = useCallback(() => {
    forceRerenderFnRef.current()
  }, [])

  const manager = useMemo(
    () => ({
      handleCategoryInView,
      registerForceRerenderFn,
      executeForceRerenderFn,
      topCategory$: subjectRef.current,
    }),
    [
      handleCategoryInView,
      registerForceRerenderFn,
      executeForceRerenderFn,
      subjectRef,
    ]
  )

  return (
    <CategoryInViewManagerContext.Provider value={manager}>
      {children}
    </CategoryInViewManagerContext.Provider>
  )
}
