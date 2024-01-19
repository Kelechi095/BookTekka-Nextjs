
interface MenuItemProps {
    handleClick: () => void
    label: string
}

const MenuItem = ({handleClick, label}: MenuItemProps) => {
  return (
    <div className="menu_item" onClick={handleClick}>
        {label}
    </div>
  )
}

export default MenuItem