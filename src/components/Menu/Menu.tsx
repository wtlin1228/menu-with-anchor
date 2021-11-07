import { data, IItem } from '../../data'
import { formatIssued } from '../../utils'

import { useScrollSpyGroupManager } from '../../managers'

import MenuCategoryHeader from './MenuCategoryHeader'
import { useRef } from 'react'
import { useEffect } from 'react'
import { scrollSpyGroup } from '../../constants/scrollSpyGroups'

interface IMenuCategory {
  categoryId: string
  title: string
  items: IItem[]
}

const MenuCategory = ({ categoryId, title, items }: IMenuCategory) => {
  const ref = useRef(null)
  const { spyTargetWithIntersectionObserver } = useScrollSpyGroupManager()
  useEffect(() => {
    if (!ref.current) {
      return () => {}
    }

    const unSpy = spyTargetWithIntersectionObserver({
      groupName: scrollSpyGroup.bookCategories,
      target: ref.current,
      options: {
        // Watch for changes only in the 1px below Header
        rootMargin: `-144px 0px ${-window.innerHeight + 144 + 1}px 0px`,
        threshold: 0,
      },
      valueToBeEmitted: categoryId,
    })

    return unSpy
  }, [categoryId, spyTargetWithIntersectionObserver])

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

  return (
    <div id="id-menu" className="bg-gray-50 mt-36">
      {data.map(({ id, title, items }) => (
        <MenuCategory key={id} categoryId={id} title={title} items={items} />
      ))}
    </div>
  )
}

export default Menu
