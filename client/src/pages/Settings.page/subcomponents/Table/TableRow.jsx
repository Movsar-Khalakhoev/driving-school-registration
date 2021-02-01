import s from './Table.module.sass'
import TableCell from '../../../../components/TableCell/TableCell'

const TableRow = ({ onClick, name, columns = [] }) => {
  return (
    <tr>
      <th className={s.cell}>{name}</th>
      {columns.map((column, index) => (
        <TableCell
          key={index}
          isActiveView={column.isActiveView}
          isTranslucentView={column.isTranslucentView}
          isDisabledView={column.isDisabledView}
          isButton={column.isButton}
          onClick={() => onClick(column.data)}
        >
          {column.userInfo && column.isUserInfo && (
            <>
              <p className={s.rented_info}>{column.userInfo.name}</p>
              <p className={s.rented_info}>{column.userInfo.practiceMode}</p>
            </>
          )}
        </TableCell>
      ))}
    </tr>
  )
}

export default TableRow
