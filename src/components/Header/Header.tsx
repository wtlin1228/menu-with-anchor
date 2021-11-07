import { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { scrollSpyGroup } from '../../constants/scrollSpyGroups'

import { data } from '../../data'
import useSubscribeToScrollSpyGroup from '../../hooks/useSubscribeToScrollSpyGroup'
import { useCategoryChipPositionManager } from '../../managers'
import { scrollElementHorizontallyTo } from '../../utils'

import HeaderCategoryChip from './HeaderCategoryChip'

const Header = () => {
  console.log('Header rerender')

  const chipsScrollBoxRef = useRef<HTMLDivElement>(null)

  const [activeCategoryId, setActiveCategoryId] = useState('')
  const activeCategoryIdRef = useRef<string>('')
  const isAutoScrollingRef = useRef<boolean>(false)

  const options = useMemo(() => {
    const callback = (topEntry: string) => {
      if (isAutoScrollingRef.current) {
        return
      }

      if (topEntry && topEntry !== activeCategoryIdRef.current) {
        activeCategoryIdRef.current = topEntry
        setActiveCategoryId(topEntry)
      }
    }

    const lastCategoryUuid = data[data.length - 1]?.id

    return {
      groupName: scrollSpyGroup.bookCategories,
      callback,
      valueToBeEmittedWhenFooterInView: lastCategoryUuid,
    }
    // I leave data here since we will get data from api response.
    // So the data will be changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useSubscribeToScrollSpyGroup(options)

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

  const handleAutoScrollingStart = useCallback(() => {
    isAutoScrollingRef.current = true
  }, [isAutoScrollingRef])
  const handleAutoScrollingEnd = useCallback(() => {
    isAutoScrollingRef.current = false
  }, [isAutoScrollingRef])

  useEffect(() => {
    if (!activeCategoryId) {
      return
    }

    // To avoid the earlier "scroll" being canceled since two
    // "scroll"s happened in the same time.
    setTimeout(() => {
      handleChipsBoxScrollTo(activeCategoryId)
    }, 0)
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
