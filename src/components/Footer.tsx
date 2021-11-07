import { useEffect, useRef } from 'react'
import { scrollSpyGroup } from '../constants/scrollSpyGroups'
import profileImg from '../images/profile-pic.jpg'
import { useScrollSpyGroupManager } from '../managers'

const GITHUB_URL = 'https://github.com/wtlin1228'

const Footer = () => {
  console.log('Footer rerender')

  const ref = useRef(null)
  const { spyFooterWithIntersectionObserver } = useScrollSpyGroupManager()
  useEffect(() => {
    if (!ref.current) {
      return () => {}
    }

    const unSpy = spyFooterWithIntersectionObserver({
      groupName: scrollSpyGroup.bookCategories,
      target: ref.current,
    })

    return unSpy
  }, [spyFooterWithIntersectionObserver])

  return (
    <footer ref={ref} className="pt-10 pb-32">
      <div className="flex px-4 space-x-6">
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
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
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

export default Footer
