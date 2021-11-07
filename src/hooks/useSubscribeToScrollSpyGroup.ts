import { useEffect } from 'react'
import { combineLatest, map } from 'rxjs'
import { useScrollSpyGroupManager } from '../managers'

// useSubscribeToScrollSpyGroup combines two subjects
// let e = last category id
// input$(targets):  ---1----2---3-----------------------3---2------1----
// input$(footer):   F-------------T------------------F------------------
// output$:          ---1----2---3-e------------------3--3---2------1----
export default function useSubscribeToScrollSpyGroup({
  groupName,
  callback,
  valueToBeEmittedWhenFooterInView,
}: {
  groupName: string
  callback: (arg0: string) => void
  valueToBeEmittedWhenFooterInView: string
}): void {
  const { getScrollSpyGroupSubjects } = useScrollSpyGroupManager()

  useEffect(() => {
    const { targets$, footer$ } = getScrollSpyGroupSubjects(groupName)

    const emitFooterValueIfFooterIsInView = ({
      topEntry,
      isFooterInView,
    }: {
      topEntry: string
      isFooterInView: boolean
    }) => {
      if (topEntry && isFooterInView) {
        return valueToBeEmittedWhenFooterInView
      }
      return topEntry
    }

    const combine$ = combineLatest({
      topEntry: targets$,
      isFooterInView: footer$,
    }).pipe(map(emitFooterValueIfFooterIsInView))

    const subscription = combine$.subscribe(callback)

    return () => {
      subscription.unsubscribe()
    }
  }, [
    groupName,
    callback,
    valueToBeEmittedWhenFooterInView,
    getScrollSpyGroupSubjects,
  ])
}
