import s from './TableCell.module.sass'

const TableCell = ({
  isButton,
  isTranslucentView, // Полупрозрачный
  isActiveView, // Зеленый или красный
  isDisabledView, // Заблокированный - бордовый
  onClick,
  children,
}) => {
  return (
    <th
      className={`${s.cell} ${isTranslucentView ? s.translucent : ''} ${
        isActiveView ? s.active : isActiveView !== undefined ? s.no_active : ''
      } ${isDisabledView ? s.disabled : ''}`}
    >
      {children}
      {isButton && !isDisabledView && (
        <button onClick={onClick} className={s.toggle_mode} />
      )}
    </th>
  )
}

export default TableCell
