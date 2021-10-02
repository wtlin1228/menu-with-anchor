import { useEffect, useRef } from 'react'

import { data, IItem } from '../../data'
import { formatIssued } from '../../utils'
import { useScrollSpyManager } from '../../managers'
import { SCROLL_SPY_GROUP } from '../../constants'

import MenuCategoryHeader from './MenuCategoryHeader'

interface IMenuCategory {
  categoryId: string
  title: string
  items: IItem[]
}

const MenuCategory = ({ categoryId, title, items }: IMenuCategory) => {
  const ref = useRef<HTMLDivElement>(null)

  const { registerScrollSpyTarget } = useScrollSpyManager(
    SCROLL_SPY_GROUP.category
  )

  useEffect(() => {
    const unregister = registerScrollSpyTarget({
      ref,
      value: categoryId,
      options: {
        // Watch for changes only in the 1px below Header
        rootMargin: `-144px 0px ${-window.innerHeight + 144 + 1}px 0px`,
        threshold: 0,
      },
    })

    return unregister
  }, [registerScrollSpyTarget, categoryId])

  return (
    <div ref={ref} id={categoryId}>
      <MenuCategoryHeader categoryId={categoryId} title={title} />
      <ul>
        {items
          .slice(0, 2)
          .map(({ id, title, authors, publishers, issued }, index) => (
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

  return (
    <div id="id-menu" className="bg-gray-50 mt-36">
      {data.map(({ id, title, items }) => (
        <MenuCategory key={id} categoryId={id} title={title} items={items} />
      ))}
    </div>
  )
}

export default Menu
