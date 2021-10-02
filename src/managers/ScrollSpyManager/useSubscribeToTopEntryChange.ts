import { useState, useCallback, useRef, useEffect } from 'react'
import { data } from '../../data'
import { useSubjectsManager } from '../SubjectsManager'
import { getSubjectKeyForFooter, getSubjectKeyForTarget } from './utils'

const lastId = data[data.length - 1].id

// useSubscribeToTopEntryChange combines two subjects
// let e = last category id
// input(targets$):  ---1----2---3---4-5---6---5---4-3---2------1----
// input(footer$):   --------------T------------------F--------------
// output:           ---1----2---3-e---------------------2------1----
export default function useSubscribeToTopEntryChange(groupName: string) {
  const [isStart, setIsStart] = useState<boolean>(false)

  const isInBottomRef = useRef<boolean>(false)
  const callbackRef = useRef<(x: any) => void>(() => {})

  const { subscribe } = useSubjectsManager()

  const setCallback = useCallback((fn: () => void): void => {
    callbackRef.current = fn
  }, [])

  useEffect(() => {
    if (isStart) {
      const footerSubjectKey = getSubjectKeyForFooter(groupName)
      const unsubscribe = subscribe(footerSubjectKey, (isFooterInView) => {
        isInBottomRef.current = isFooterInView
        if (!isFooterInView) {
          return
        }

        callbackRef.current(lastId)
      })
      return unsubscribe
    }
  }, [subscribe, isStart, groupName])

  useEffect(() => {
    if (isStart) {
      const targetSubjectKey = getSubjectKeyForTarget(groupName)
      const unsubscribe = subscribe(targetSubjectKey, (topCategoryId) => {
        if (isInBottomRef.current) {
          return
        }

        callbackRef.current(topCategoryId)
      })

      return unsubscribe
    }
  }, [subscribe, isStart, groupName])

  return { setIsStart, setCallback }
}
