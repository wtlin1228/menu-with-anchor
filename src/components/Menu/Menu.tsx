import { data, IItem } from '../../data'
import { formatIssued } from '../../utils'

import { useCategoryInViewManager } from '../../managers'

import useMenuCategoryInView from '../../hooks/useMenuCategoryInView'

import MenuCategoryHeader from './MenuCategoryHeader'
import { useState } from 'react'
import { useEffect } from 'react'

interface IMenuCategory {
  categoryId: string
  title: string
  items: IItem[]
  reset: object
}

const MenuCategory = ({ categoryId, title, items, reset }: IMenuCategory) => {
  const { handleCategoryInView } = useCategoryInViewManager()

  const { ref } = useMenuCategoryInView({
    callback: () => handleCategoryInView(categoryId),
    reset,
  })

  return (
    <div ref={ref} id={categoryId}>
      <MenuCategoryHeader categoryId={categoryId} title={title} />
      <ul>
        {items.map(({ id, title, authors, publishers, issued }, index) => (
          <li key={id}>
            {index !== 0 && (
              <span className="block w-full border border-gray-300" />
            )}
            <div className="p-2">
              <p className="font-medium">{title}</p>
              <p className="text-gray-700">
                By <span className="font-medium">{authors.join(', ')}</span>
              </p>
              <p className="text-gray-500">
                {publishers.join(', ')}
                <span className="font-medium"> {formatIssued(issued)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Menu = () => {
  console.log('Menu rerender')

  const [reset, forceRerender] = useState<object>({})
  const { registerForceRerenderFn } = useCategoryInViewManager()
  useEffect(() => {
    registerForceRerenderFn(() => forceRerender({}))
  }, [registerForceRerenderFn, forceRerender])

  return (
    <div id="id-menu" className="bg-gray-50 mt-36">
      {data.map(({ id, title, items }) => (
        <MenuCategory
          key={id}
          categoryId={id}
          title={title}
          items={items}
          reset={reset}
        />
      ))}
    </div>
  )
}

export default Menu
