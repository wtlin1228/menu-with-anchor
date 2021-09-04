import useAnchorRegister from '../../hooks/useAnchorRegister'

interface ICategoryHeaderProps {
  categoryId: string
  title: string
}

const MenuCategoryHeader = ({ categoryId, title }: ICategoryHeaderProps) => {
  const { ref } = useAnchorRegister(categoryId)

  return (
    <p ref={ref} className="py-4 pl-2 text-lg bg-gray-200">
      {title}
    </p>
  )
}

export default MenuCategoryHeader
