import { useCallback, useRef, useMemo, ReactNode } from 'react'
import type { IObserverAndTarget } from './types'

import ScrollSpyManagerContext from './ScrollSpyManagerContext'

interface IScrollSpyMangerProvider {
  children: ReactNode
}

export default function ScrollSpyMangerProvider({
  children,
}: IScrollSpyMangerProvider) {
  const observerAndTargetGroupMapRef = useRef<
    Record<string, IObserverAndTarget[]>
  >({})

  const getGroup = useCallback((groupName: string): IObserverAndTarget[] => {
    if (!observerAndTargetGroupMapRef.current[groupName]) {
      observerAndTargetGroupMapRef.current[groupName] = []
    }

    return observerAndTargetGroupMapRef.current[groupName]
  }, [])

  const pushIntoGroup = useCallback(
    (
      groupName: string,
      observer: IntersectionObserver,
      target: HTMLElement
    ): void => {
      const group = getGroup(groupName)
      group.push({ observer, target })
    },
    [getGroup]
  )

  const removeFromGroup = useCallback(
    (
      groupName: string,
      observer: IntersectionObserver,
      target: HTMLElement
    ): void => {
      const group = getGroup(groupName)
      const toBeRemoved = observerAndTargetGroupMapRef.current[groupName].find(
        (x) => x.observer === observer && x.target === target
      )

      toBeRemoved?.observer.unobserve(toBeRemoved.target)

      observerAndTargetGroupMapRef.current[groupName] = group.filter(
        (x) => !(x.observer === observer && x.target === target)
      )
    },
    [getGroup]
  )

  const reObserveWholeGroup = useCallback(
    (groupName: string): void => {
      const group = getGroup(groupName)

      group.forEach(({ observer, target }) => {
        observer.unobserve(target)
        observer.observe(target)
      })
    },
    [getGroup]
  )

  const manager = useMemo(
    () => ({
      getGroup,
      pushIntoGroup,
      removeFromGroup,
      reObserveWholeGroup,
    }),
    [getGroup, pushIntoGroup, removeFromGroup, reObserveWholeGroup]
  )

  return (
    <ScrollSpyManagerContext.Provider value={manager}>
      {children}
    </ScrollSpyManagerContext.Provider>
  )
}
