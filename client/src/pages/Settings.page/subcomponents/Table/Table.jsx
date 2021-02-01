import s from './Table.module.sass'
import TableHead from './TableHead'
import TableRow from './TableRow'
import Loader from '../../../../components/Loader/Loader'

const Table = ({
  isLoading,
  isUserInfo,
  changedCells,
  setChangedCells,
  changeItemsState,
  rows = [],
  head = [],
}) => {
  const changeCellsState = data => {
    const [firstKey, secondKey] = Object.keys(data)
    const candidateIndex = changedCells.findIndex(
      cell =>
        cell[firstKey] === data[firstKey] && cell[secondKey] === data[secondKey]
    )

    if (candidateIndex === -1) {
      setChangedCells([
        ...changedCells,
        { [firstKey]: data[firstKey], [secondKey]: data[secondKey] },
      ])
    } else {
      setChangedCells([
        ...changedCells.slice(0, candidateIndex),
        ...changedCells.slice(candidateIndex + 1),
      ])
    }

    changeItemsState(data)
  }

  return (
    <div className={s.loading_wrapper}>
      {isLoading && (
        <div className={s.loading}>
          <Loader />
        </div>
      )}
      <div
        className={`${s.table_wrapper} ${
          isLoading ? s.table_wrapper_loading : ''
        }`}
      >
        <table className={s.table}>
          <TableHead columns={head} />
          <tbody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                name={row.title}
                columns={row.cells}
                isUserInfo={isUserInfo}
                onClick={changeCellsState}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
