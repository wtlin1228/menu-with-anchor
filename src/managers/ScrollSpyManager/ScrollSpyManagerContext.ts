import { createContext } from 'react'
import type { IObserverAndTarget } from './types'

interface IScrollSpyManagerContext {
  getGroup: (groupName: string) => IObserverAndTarget[]
  pushIntoGroup: (
    groupName: string,
    observer: IntersectionObserver,
    target: HTMLElement
  ) => void
  removeFromGroup: (
    groupName: string,
    observer: IntersectionObserver,
    target: HTMLElement
  ) => void
  reObserveWholeGroup: (groupName: string) => void
}

const ScrollSpyManagerContext = createContext({} as IScrollSpyManagerContext)

export default ScrollSpyManagerContext
