function genSeats(matrix) {
  const perSeat = ({ row, column, status }) => ({
    column: `${column}`,
    extId: '2734',
    flag: '0',
    name: `${row}排${column}座`,
    row: `${row}`,
    rowName: `${row}`,
    seatId: `${row}${column}`,
    status: `${status}`
  })
  const seats = []
  const info = {
    maxColumn: 0,
    minColumn: 0,
    maxRow: 0,
    minRow: 0
  }
  matrix.forEach((rowArr, row) => {
    row > info.maxRow ? (info.maxRow = row) : null
    row < info.minRow ? (info.minRow = row) : null
    rowArr.forEach((el, idx) => {
      idx > info.maxColumn ? (info.maxColumn = idx) : null
      idx < info.minColumn ? (info.minColumn = idx) : null
      seats.push(
        perSeat({
          row: row,
          column: idx,
          status: el
        })
      )
    })
  })

  return {
    api: 'mtop.film.mtopseatapi.getscheduleseat',
    data: {
      returnCode: '0',
      returnValue: {
        hallSeatMap: {
          seatCount: '167',
          sectionSeatMapList: [
            {
              maxColumn: info.maxColumn,
              maxRow: info.maxRow,
              minColumn: info.minColumn,
              minRow: info.minRow,
              seats: seats
            }
          ],
          soldCount: '2'
        }
      }
    },
    ret: ['SUCCESS::调用成功'],
    v: '7.5'
  }
}
module.exports = genSeats
