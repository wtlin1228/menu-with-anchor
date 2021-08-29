import { data } from '../data'
import { useCategoryAnchorManager } from '../managers'
import { scrollWindowVerticallyTo } from '../utils'

const HEADER_OFFSET = 144

const Header = () => {
  console.log('Header rerender')

  const { getCategoryAnchor } = useCategoryAnchorManager()

  return (
    <header className="fixed top-0 max-w-md pt-10 pb-3 bg-white">
      <div className="text-2xl font-semibold text-blue-800">
        LeoNerd<span className="font-black text-pink-400">'</span>s Bookshelf
      </div>
      <div
        id="chips-scroll-box"
        className="flex overflow-x-scroll mt-7"
        style={{ scrollbarWidth: 'none' }}
      >
        {data.map(({ id, title }, index) => (
          <div
            key={id}
            className={[
              'whitespace-nowrap',
              'rounded-lg',
              'py-1',
              'px-2',
              `ml-${index === 0 ? 0 : 4}`,
              'cursor-pointer',
              'bg-gray-200',
            ].join(' ')}
            onClick={() => {
              const anchor = getCategoryAnchor(id)
              if (anchor) {
                scrollWindowVerticallyTo(anchor, {
                  verticalOffset: HEADER_OFFSET * -1,
                })
              }
            }}
          >
            {title}
          </div>
        ))}
      </div>
    </header>
  )
}

export default Header
