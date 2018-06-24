const tppUserSimple = require('./tppUserSimple')
const { chooseBestSeat } = require('./util/chooseDesiredSeat')
function preLockSeat(scheduleSeatApiData, { ticketNum }) {
  const combinations = chooseBestSeat(scheduleSeatApiData, {
    ticketNum
  })
  const seatIDs = []
  const seatNames = []
  combinations.general[0].forEach(el => {
    seatIDs.push(el.seatId)
    seatNames.push(el.name)
  })
  return Promise.resolve({
    mobile: scheduleSeatApiData.data.returnValue.userPhone,
    scheduleId: scheduleSeatApiData.data.returnValue.schedule.scheduleId,
    seatIDs: seatIDs.join('|'),
    seatNames: seatNames.join('|'),
    seatIDsArr: seatIDs,
    seatNamesArr: seatNames
  })
}
module.exports = preLockSeat
