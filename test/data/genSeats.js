function genSeats(matrix) {
  const dataWrap = arr => {
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
}
module.exports = genSeats
