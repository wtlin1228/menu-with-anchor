import { useContext } from 'react'

import ScrollSpyManagerContext from './ScrollSpyManagerContext'

export default function useScrollSpyManagerContext() {
  return useContext(ScrollSpyManagerContext)
}
