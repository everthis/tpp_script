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
  matrix.forEach((rowArr, row) => {
    rowArr.forEach((el, idx) => {
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
              maxColumn: '15',
              maxRow: '14',
              minColumn: '2',
              minRow: '2',
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
