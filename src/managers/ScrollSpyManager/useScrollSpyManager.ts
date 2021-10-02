import { useCallback, useMemo } from 'react'
import { useSubjectsManager } from '../SubjectsManager'

import useSubscribeToTopEntryChange from './useSubscribeToTopEntryChange'
import useScrollSpyManagerContext from './useScrollSpyManagerContext'
import { getSubjectKeyForFooter, getSubjectKeyForTarget } from './utils'

export default function useScrollSpyManager(groupName: string) {
  const { setIsStart, setCallback } = useSubscribeToTopEntryChange(groupName)

  const { pushIntoGroup, removeFromGroup, reObserveWholeGroup } =
    useScrollSpyManagerContext()

  const { nextValue } = useSubjectsManager()

  const registerScrollSpyTarget = useCallback(
    ({
      ref,
      value,
      options,
    }: {
      ref: { current: HTMLElement | null }
      value: any
      options: IntersectionObserverInit
    }): (() => void) => {
      if (!ref.current) {
        return () => {}
      }

      const targetSubjectKey = getSubjectKeyForTarget(groupName)

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          nextValue(targetSubjectKey, value)
        }
      }, options)

      pushIntoGroup(groupName, observer, ref.current)

      const target = ref.current
      observer.observe(target)

      return () => {
        removeFromGroup(groupName, observer, target)
        observer.unobserve(target)
      }
    },
    [groupName, nextValue, pushIntoGroup, removeFromGroup]
  )

  const registerScrollSpyFooter = useCallback(
    ({
      ref,
      options,
    }: {
      ref: { current: HTMLElement | null }
      options: IntersectionObserverInit
    }): (() => void) => {
      if (!ref.current) {
        return () => {}
      }

      const footerSubjectKey = getSubjectKeyForFooter(groupName)

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio === 1) {
          nextValue(footerSubjectKey, true)
        } else {
          nextValue(footerSubjectKey, false)
          reObserveWholeGroup(groupName)
        }
      }, options)

      const target = ref.current
      observer.observe(target)

      return () => observer.unobserve(target)
    },
    [nextValue, reObserveWholeGroup, groupName]
  )

  const registerChangeListener = useCallback(
    (callback): (() => void) => {
      setCallback(callback)
      setIsStart(true)

      return () => {
        setCallback(() => {})
        setIsStart(false)
      }
    },
    [setCallback, setIsStart]
  )

  const manager = useMemo(
    () => ({
      registerScrollSpyTarget,
      registerScrollSpyFooter,
      registerChangeListener,
    }),
    [registerChangeListener, registerScrollSpyFooter, registerScrollSpyTarget]
  )

  return manager
}
