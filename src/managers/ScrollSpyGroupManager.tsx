import { BehaviorSubject } from 'rxjs'

import {
  createContext,
  useRef,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from 'react'

interface ISpyTargetWithIntersectionObserverInput {
  groupName: string
  target: HTMLElement
  options: IntersectionObserverInit
  valueToBeEmitted: any
}

interface ISpyFooterWithIntersectionObserverInput {
  groupName: string
  target: HTMLElement
  options?: IntersectionObserverInit
}

type TCleanupFn = () => void

interface IScrollSpyGroupSubjects {
  targets$: BehaviorSubject<any>
  footer$: BehaviorSubject<boolean>
}

interface IScrollSpyGroup {
  behaviorSubjects: IScrollSpyGroupSubjects
}

interface IScrollSpyGroupManagerContext {
  spyTargetWithIntersectionObserver: (
    arg0: ISpyTargetWithIntersectionObserverInput
  ) => TCleanupFn
  spyFooterWithIntersectionObserver: (
    arg0: ISpyFooterWithIntersectionObserverInput
  ) => TCleanupFn
  getScrollSpyGroupSubjects: (groupName: string) => IScrollSpyGroupSubjects
}

const generateGroupInitialValue = (): IScrollSpyGroup => ({
  behaviorSubjects: {
    targets$: new BehaviorSubject<any>(null),
    footer$: new BehaviorSubject<boolean>(false),
  },
})

const ScrollSpyGroupManagerContext = createContext(
  {} as IScrollSpyGroupManagerContext
)

export const useScrollSpyGroupManager = () => {
  const context = useContext(ScrollSpyGroupManagerContext)

  return context
}

interface IScrollSpyGroupManagerProviderProps {
  children: ReactNode
}

export function ScrollSpyGroupManagerProvider({
  children,
}: IScrollSpyGroupManagerProviderProps) {
  const scrollSpyGroupMapRef = useRef<Record<string, IScrollSpyGroup>>({})

  const getScrollSpyGroup = useCallback(
    (groupName: string): IScrollSpyGroup => {
      if (!scrollSpyGroupMapRef.current[groupName]) {
        scrollSpyGroupMapRef.current[groupName] = generateGroupInitialValue()
      }

      return scrollSpyGroupMapRef.current[groupName]
    },
    []
  )

  const getScrollSpyGroupSubjects = useCallback(
    (groupName: string): IScrollSpyGroupSubjects => {
      const group = getScrollSpyGroup(groupName)
      return group.behaviorSubjects
    },
    [getScrollSpyGroup]
  )

  const spyTargetWithIntersectionObserver = useCallback(
    ({
      groupName,
      target,
      options,
      valueToBeEmitted,
    }: ISpyTargetWithIntersectionObserverInput): TCleanupFn => {
      if (!target) {
        return () => {}
      }

      const { targets$ } = getScrollSpyGroupSubjects(groupName)

      const callback: IntersectionObserverCallback = ([entry]) => {
        if (entry.isIntersecting) {
          targets$.next(valueToBeEmitted)
        }
      }
      const observer = new IntersectionObserver(callback, options)

      observer.observe(target)
      return () => {
        observer.unobserve(target)
      }
    },
    [getScrollSpyGroupSubjects]
  )

  const spyFooterWithIntersectionObserver = useCallback(
    ({
      groupName,
      target,
      options = { threshold: 0.99 },
    }: ISpyFooterWithIntersectionObserverInput): TCleanupFn => {
      if (!target) {
        return () => {}
      }

      const { footer$ } = getScrollSpyGroupSubjects(groupName)

      const callback: IntersectionObserverCallback = ([entry]) => {
        if (entry.isIntersecting) {
          footer$.next(true)
        } else {
          footer$.next(false)
        }
      }
      const observer = new IntersectionObserver(callback, options)

      observer.observe(target)
      return () => {
        observer.unobserve(target)
      }
    },
    [getScrollSpyGroupSubjects]
  )

  const manager = useMemo(
    () => ({
      spyTargetWithIntersectionObserver,
      spyFooterWithIntersectionObserver,
      getScrollSpyGroupSubjects,
    }),
    [
      spyTargetWithIntersectionObserver,
      spyFooterWithIntersectionObserver,
      getScrollSpyGroupSubjects,
    ]
  )

  return (
    <ScrollSpyGroupManagerContext.Provider value={manager}>
      {children}
    </ScrollSpyGroupManagerContext.Provider>
  )
}
