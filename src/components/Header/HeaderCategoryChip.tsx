import { useCategoryAnchorManager } from '../../managers'
import { scrollWindowVerticallyTo } from '../../utils'
import usePositionRegister from '../../hooks/usePositionRegister'

const HEADER_OFFSET = 144

const getHeaderCategoryChipClassName = (
  isFirst: boolean,
  isActive: boolean
): string =>
  [
    'whitespace-nowrap',
    'rounded-lg',
    'py-1',
    'px-2',
    `ml-${isFirst ? 0 : 4}`,
    'cursor-pointer',
    `${isActive ? 'bg-red-200' : 'bg-gray-200'}`,
  ].join(' ')

interface IHeaderCategoryChipProps {
  categoryId: string
  title: string
  isFirst: boolean
  isActive: boolean
  onAutoScrollingStart: () => void
  onAutoScrollingEnd: () => void
  handleChipsBoxScrollTo: (categoryId: string) => void
  setActiveCategoryId: (categoryId: string) => void
}

const HeaderCategoryChip = ({
  categoryId,
  title,
  isFirst,
  isActive,
  onAutoScrollingStart,
  onAutoScrollingEnd,
  handleChipsBoxScrollTo,
  setActiveCategoryId,
}: IHeaderCategoryChipProps) => {
  const { ref } = usePositionRegister(categoryId)

  const { getCategoryAnchor } = useCategoryAnchorManager()

  const handleMenuScrollTo = async (categoryId: string) => {
    const anchor = getCategoryAnchor(categoryId)
    if (anchor) {
      await scrollWindowVerticallyTo(anchor, {
        verticalOffset: -HEADER_OFFSET + 1, // +1 for not to scroll to the observer margin edge
      })
    }
  }

  const handleClickAsync = async () => {
    onAutoScrollingStart()
    setActiveCategoryId(categoryId)
    await handleMenuScrollTo(categoryId)
    handleChipsBoxScrollTo(categoryId)
    onAutoScrollingEnd()
  }

  return (
    <div
      ref={ref}
      className={getHeaderCategoryChipClassName(isFirst, isActive)}
      onClick={handleClickAsync}
    >
      {title}
    </div>
  )
}

export default HeaderCategoryChip
