import { useCategoryAnchorManager } from '../../managers'
import { scrollWindowVerticallyTo } from '../../utils'

const HEADER_OFFSET = 144

const getHeaderCategoryChipClassName = (isFirst: boolean): string =>
  [
    'whitespace-nowrap',
    'rounded-lg',
    'py-1',
    'px-2',
    `ml-${isFirst ? 0 : 4}`,
    'cursor-pointer',
    'bg-gray-200',
  ].join(' ')

interface IHeaderCategoryChipProps {
  categoryId: string
  title: string
  isFirst: boolean
}

const HeaderCategoryChip = ({
  categoryId,
  title,
  isFirst,
}: IHeaderCategoryChipProps) => {
  const { getCategoryAnchor } = useCategoryAnchorManager()

  const handleClick = () => {
    const anchor = getCategoryAnchor(categoryId)
    if (anchor) {
      scrollWindowVerticallyTo(anchor, {
        verticalOffset: HEADER_OFFSET * -1,
      })
    }
  }

  return (
    <div
      className={getHeaderCategoryChipClassName(isFirst)}
      onClick={handleClick}
    >
      {title}
    </div>
  )
}

export default HeaderCategoryChip
