import { useEffect, useRef } from 'react'

import { useCategoryAnchorManager } from '../../managers'

interface ICategoryHeaderProps {
  categoryId: string
  title: string
}

const MenuCategoryHeader = ({ categoryId, title }: ICategoryHeaderProps) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const { registerCategoryAnchor, unregisterCategoryAnchor } =
    useCategoryAnchorManager()

  useEffect(() => {
    if (ref.current) {
      registerCategoryAnchor(categoryId, ref.current)
    }
    return () => unregisterCategoryAnchor(categoryId)
  }, [categoryId, registerCategoryAnchor, unregisterCategoryAnchor])

  return (
    <p ref={ref} id={categoryId} className="py-4 pl-2 text-lg bg-gray-200">
      {title}
    </p>
  )
}

export default MenuCategoryHeader
