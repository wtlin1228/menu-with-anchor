import { Subject } from 'rxjs'
import type { Subject as TSubject } from 'rxjs'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  ReactNode,
} from 'react'

interface ISubjectsManagerContext {
  getSubject: (subjectKey: string) => TSubject<any>
  nextValue: (subjectKey: string, value: any) => void
  subscribe: (subjectKey: string, callback: (value: any) => void) => () => void
}

const SubjectsManagerContext = createContext({} as ISubjectsManagerContext)

export const useSubjectsManager = () => {
  const context = useContext(SubjectsManagerContext)

  return context
}

interface ISubjectsManagerProviderProps {
  children: ReactNode
}

export const SubjectsManagerProvider = ({
  children,
}: ISubjectsManagerProviderProps) => {
  const subjectsRef = useRef<Record<string, TSubject<any>>>({})

  const registerSubject = useCallback((subjectKey: string): TSubject<any> => {
    const newSubject = new Subject<any>()
    subjectsRef.current[subjectKey] = newSubject
    return newSubject
  }, [])

  const getSubject = useCallback(
    (subjectKey: string): TSubject<any> => {
      return subjectsRef.current[subjectKey] || registerSubject(subjectKey)
    },
    [registerSubject]
  )

  const nextValue = useCallback(
    (subjectKey: string, value: any) => {
      const subject = getSubject(subjectKey)
      subject.next(value)
    },
    [getSubject]
  )

  const subscribe = useCallback(
    (subjectKey: string, callback: (value: any) => void) => {
      const subject = getSubject(subjectKey)
      return subject.subscribe(callback).unsubscribe
    },
    [getSubject]
  )

  const manager = useMemo(
    () => ({
      getSubject,
      nextValue,
      subscribe,
    }),
    [getSubject, nextValue, subscribe]
  )

  return (
    <SubjectsManagerContext.Provider value={manager}>
      {children}
    </SubjectsManagerContext.Provider>
  )
}
