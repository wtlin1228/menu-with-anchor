import { useRef } from 'react'
import { useEffect } from 'react'
import { data, IItem } from '../../data'
import { formatIssued } from '../../utils'

import { useCategoryInViewManager } from '../../managers'

import MenuCategoryHeader from './MenuCategoryHeader'

interface IMenuCategory {
  categoryId: string
  title: string
  items: IItem[]
}

const MenuCategory = ({ categoryId, title, items }: IMenuCategory) => {
  const { handleCategoryInView } = useCategoryInViewManager()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleCategoryInView(categoryId)
        }
      },
      {
        rootMargin: `-144px 0px -${window.innerHeight - 144 - 30}px 0px`,
        threshold: 0,
      }
    )

    const target = ref.current
    if (target) {
      observer.observe(target)
    }
    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [categoryId, handleCategoryInView])

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
