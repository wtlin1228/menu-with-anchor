import { data } from '../../data'

import HeaderCategoryChip from './HeaderCategoryChip'

const Header = () => {
  console.log('Header rerender')

  return (
    <header className="fixed top-0 w-full pt-10 pb-3 bg-white">
      <div className="container max-w-md mx-auto">
        <div className="pl-4 text-2xl font-semibold text-blue-800">
          LeoNerd<span className="font-black text-pink-400">'</span>s Bookshelf
        </div>
        <div
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
            />
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
