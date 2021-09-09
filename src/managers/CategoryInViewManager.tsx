import { Subject } from 'rxjs'

import { useRef, useCallback, useContext, useMemo, ReactNode } from 'react'
import { createContext } from 'react'

interface ICategoryInViewManagerContext {
  handleCategoryInView: (categoryId: string, isInBottom?: boolean) => void
  handleLeaveBottom: () => void
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
  const isInBottomRef = useRef<boolean>(false)
  const subjectRef = useRef(new Subject<string>())

  const handleCategoryInView = useCallback(
    (categoryId: string, isInBottom: boolean = false) => {
      if (!isInBottomRef.current) {
        subjectRef.current.next(categoryId)
      }

      isInBottomRef.current = isInBottom
    },
    [subjectRef]
  )

  const handleLeaveBottom = useCallback(() => {
    isInBottomRef.current = false
  }, [])

  const registerForceRerenderFn = useCallback((fn) => {
    forceRerenderFnRef.current = fn
  }, [])

  const executeForceRerenderFn = useCallback(() => {
    forceRerenderFnRef.current()
  }, [])

  const manager = useMemo(
    () => ({
      handleCategoryInView,
      handleLeaveBottom,
      registerForceRerenderFn,
      executeForceRerenderFn,
      topCategory$: subjectRef.current,
    }),
    [
      handleCategoryInView,
      handleLeaveBottom,
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
