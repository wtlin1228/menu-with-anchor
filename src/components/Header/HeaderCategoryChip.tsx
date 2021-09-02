import { useCategoryAnchorManager } from '../../managers'
import { scrollWindowVerticallyTo } from '../../utils'

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
}

const HeaderCategoryChip = ({
  categoryId,
  title,
  isFirst,
  isActive,
}: IHeaderCategoryChipProps) => {
  const { getCategoryAnchor } = useCategoryAnchorManager()

  const handleClick = () => {
    const anchor = getCategoryAnchor(categoryId)
    if (anchor) {
      scrollWindowVerticallyTo(anchor, {
        verticalOffset: -HEADER_OFFSET + 1, // +1 for not to scroll to the observer margin edge
      })
    }
  }

  return (
    <div
      className={getHeaderCategoryChipClassName(isFirst, isActive)}
      onClick={handleClick}
    >
      {title}
    </div>
  )
}

export default HeaderCategoryChip
