import { useCallback, useState, useEffect, useRef } from 'react'

import { data } from '../../data'
import {
  useCategoryChipPositionManager,
  useCategoryInViewManager,
} from '../../managers'
import { scrollElementHorizontallyTo } from '../../utils/scrollElementHorizontallyTo'

import HeaderCategoryChip from './HeaderCategoryChip'

const Header = () => {
  console.log('Header rerender')

  const chipsScrollBoxRef = useRef<HTMLDivElement>(null)
  const [activeCategoryId, setActiveCategoryId] = useState<string>('')

  const isAutoScrollingRef = useRef<boolean>(false)
  const handleAutoScrollingStart = useCallback(() => {
    isAutoScrollingRef.current = true
  }, [])
  const handleAutoScrollingEnd = useCallback(() => {
    isAutoScrollingRef.current = false
  }, [])

  const { getCategoryChipPosition } = useCategoryChipPositionManager()

  // useCallback to prevent keep subscribing and unsubscribing to topCategory$
  const handleChipsBoxScrollTo = useCallback(
    (categoryId) => {
      const positionX = getCategoryChipPosition(categoryId)
      if (positionX && chipsScrollBoxRef.current) {
        scrollElementHorizontallyTo(positionX - 5, {
          elementToScroll: chipsScrollBoxRef.current,
        })
      }
    },
    [getCategoryChipPosition]
  )

  const { topCategory$ } = useCategoryInViewManager()

  // subscribe to topCategory$ and activate corresponding category chip
  useEffect(() => {
    const subscription = topCategory$.subscribe((categoryId) => {
      if (isAutoScrollingRef.current) {
        return
      }
      setActiveCategoryId(categoryId)
    })
    return () => subscription.unsubscribe()
  }, [topCategory$])

  // subscribe to topCategory$ and scroll to corresponding category chip horizontally
  useEffect(() => {
    const subscription = topCategory$.subscribe((categoryId) => {
      if (isAutoScrollingRef.current) {
        return
      }

      handleChipsBoxScrollTo(categoryId)
    })
    return () => subscription.unsubscribe()
  }, [topCategory$, handleChipsBoxScrollTo])

  return (
    <header className="fixed top-0 w-full pt-10 pb-3 bg-white">
      <div className="container max-w-md mx-auto">
        <div className="pl-4 text-2xl font-semibold text-blue-800">
          LeoNerd<span className="font-black text-pink-400">'</span>s Bookshelf
        </div>
        <div
          ref={chipsScrollBoxRef}
          id="chips-scroll-box"
          className="flex px-2 overflow-x-scroll mt-7"
          style={{ scrollbarWidth: 'none' }}
        >
          {data.map(({ id, title }, index) => (
            <HeaderCategoryChip
              key={id}
              categoryId={id}
              title={title}
              isFirst={index === 0}
              isActive={id === activeCategoryId}
              onAutoScrollingStart={handleAutoScrollingStart}
              onAutoScrollingEnd={handleAutoScrollingEnd}
              handleChipsBoxScrollTo={handleChipsBoxScrollTo}
              setActiveCategoryId={setActiveCategoryId}
            />
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
