import { useEffect, useRef, useState } from 'react'
import { SUBJECT_KEY } from '../constants'
import { useSubjectsManager } from '../managers'
import { data } from '../data'

const lastId = data[data.length - 1].id

// let e = last category id
// input:  ---1----2---3-4-5---6---5---4--3-2------1----
// input:  -------------T------------------F------------
// output: ---1----2---3e-------------------2------1----
export default function useActiveHeaderCategoryChip() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('')
  const isAutoScrollingRef = useRef<boolean>(false)
  const isInBottomRef = useRef<boolean>(false)
  const { subscribe } = useSubjectsManager()

  useEffect(() => {
    const unsubscribe = subscribe(
      SUBJECT_KEY.footerInView$,
      (isFooterInView) => {
        isInBottomRef.current = isFooterInView
        if (!isFooterInView || isAutoScrollingRef.current) {
          return
        }

        setActiveCategoryId(lastId)
      }
    )

    return unsubscribe
  }, [subscribe])

  useEffect(() => {
    const unsubscribe = subscribe(SUBJECT_KEY.topCategory$, (topCategoryId) => {
      if (isInBottomRef.current || isAutoScrollingRef.current) {
        return
      }

      setActiveCategoryId(topCategoryId)
    })

    return unsubscribe
  }, [subscribe])

  return {
    activeCategoryId,
    setActiveCategoryId,
    isAutoScrollingRef,
  }
}
