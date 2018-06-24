const {
  availableConsecutiveSeatsInRow,
  chooseBestSeat
} = require('./util/chooseDesiredSeat')
const apiData = require('./json/singleHallCenterHalfOccupied.json')

const d = chooseBestSeat(apiData, {
  ticketNum: 4
})
const ids = []
d.general.forEach(arr => {
  arr.forEach(el => {
    if (ids.indexOf(el.seatId) === -1) {
      ids.push(el.seatId)
    }
  })
})
console.log(ids)
