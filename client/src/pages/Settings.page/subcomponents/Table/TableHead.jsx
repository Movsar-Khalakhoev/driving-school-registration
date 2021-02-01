import s from './Table.module.sass'
import TableCell from '../../../../components/TableCell/TableCell'

const TableHead = ({ columns = [] }) => {
  return (
    <thead>
      <tr>
        <th className={s.cell}> </th>
        {columns.map((column, index) => (
          <TableCell key={index}>{column}</TableCell>
        ))}
      </tr>
    </thead>
  )
}

export default TableHead
