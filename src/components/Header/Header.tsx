import { useCallback, useEffect, useRef } from 'react'

import { data } from '../../data'
import useActiveHeaderCategoryChip from '../../hooks/useActiveHeaderCategoryChip'
import { useCategoryChipPositionManager } from '../../managers'
import { scrollElementHorizontallyTo } from '../../utils'

import HeaderCategoryChip from './HeaderCategoryChip'

const Header = () => {
  console.log('Header rerender')

  const { activeCategoryId, setActiveCategoryId, isAutoScrollingRef } =
    useActiveHeaderCategoryChip()

  const chipsScrollBoxRef = useRef<HTMLDivElement>(null)

  const handleAutoScrollingStart = useCallback(() => {
    isAutoScrollingRef.current = true
  }, [isAutoScrollingRef])
  const handleAutoScrollingEnd = useCallback(() => {
    isAutoScrollingRef.current = false
  }, [isAutoScrollingRef])

  const { getCategoryChipPosition } = useCategoryChipPositionManager()
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

  useEffect(() => {
    handleChipsBoxScrollTo(activeCategoryId)
  }, [activeCategoryId, handleChipsBoxScrollTo])

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
