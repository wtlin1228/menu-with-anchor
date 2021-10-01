import { data, IItem } from '../../data'
import { formatIssued } from '../../utils'

import useMenuCategoryInView from '../../hooks/useMenuCategoryInView'

import MenuCategoryHeader from './MenuCategoryHeader'

interface IMenuCategory {
  categoryId: string
  title: string
  items: IItem[]
}

const MenuCategory = ({ categoryId, title, items }: IMenuCategory) => {
  const { ref } = useMenuCategoryInView(categoryId)

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
