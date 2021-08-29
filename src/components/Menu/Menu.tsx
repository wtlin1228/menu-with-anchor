import { data } from '../../data'
import { formatIssued } from '../../utils'

import MenuCategoryHeader from './MenuCategoryHeader'

const Menu = () => {
  console.log('Menu rerender')

  return (
    <div className="bg-gray-50 mt-36">
      {data.map(({ id, title, items }) => (
        <div key={id}>
          <MenuCategoryHeader categoryId={id} title={title} />
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
      ))}
    </div>
  )
}

export default Menu