import { format } from 'date-fns'

import { data } from './data'
import profileImg from './profile-pic.jpg'

const formatIssued = (issued: string): string =>
  format(new Date(issued), 'MMM yyyy')

const Header = () => {
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
            className={`
              whitespace-nowrap 
              rounded-lg 
              py-1 
              px-2
              ml-${index === 0 ? 0 : 4}
              cursor-pointer 
              bg-gray-200 
            `}
          >
            {title}
          </div>
        ))}
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="pt-10 pb-32">
      <div className="flex space-x-6">
        <div className="flex-none w-12 h-12 overflow-hidden rounded-full">
          <img
            alt="profile"
            src={profileImg}
            className="object-cover w-full h-full"
          />
        </div>

        <p>
          Created by{' '}
          <a
            href="https://github.com/wtlin1228"
            className="font-bold text-pink-400"
          >
            Leo Lin
          </a>{' '}
          who lives and works in Taiwan being a frontend engineer.
        </p>
      </div>
    </footer>
  )
}

const Menu = () => {
  return (
    <div className="bg-gray-50 mt-36">
      {data.map(({ id, title, items }) => (
        <div key={id}>
          <p className="py-4 pl-2 text-lg bg-gray-200">{title}</p>
          <ul>
            {items.map(({ id, title, authors, publishers, issued }, index) => (
              <li key={id} className="">
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

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="container max-w-md min-h-screen mx-auto">
        <Header />
        <Menu />
        <Footer />
      </div>
    </div>
  )
}

export default App
