function prePlaceOrder(tppUserSimpleApiData, payCheckApiData) {
  const payCheckApiDataReturnValue = payCheckApiData.data.returnValue
  const userNumId = tppUserSimpleApiData.data.userNumId
  const scheduleId = payCheckApiDataReturnValue.schedule.id
  const seatIDsArr = []
  const seatNamesArr = []
  const totalPrice = payCheckApiDataReturnValue.displayTotalPrice
  const mobile = payCheckApiDataReturnValue.userPhone.phone
  payCheckApiDataReturnValue.seatLocked.lockedSeats.forEach(el => {
    seatIDsArr.push(el.seatId)
    seatNamesArr.push(el.name)
  })
  const activityIds =
    payCheckApiDataReturnValue.ordering &&
    payCheckApiDataReturnValue.ordering.activityIds
  const useActivityFlag =
    payCheckApiDataReturnValue.ordering &&
    payCheckApiDataReturnValue.ordering.useActivityFlag
  return {
    scheduleId,
    lockSeatApplyKey: `${userNumId}_${scheduleId}_[${seatIDsArr.join(', ')}]`,
    seatIDs: seatIDsArr.join('|'),
    seatNames: seatNamesArr.join('|'),
    activityIds,
    useActivityFlag,
    totalPrice,
    mobile
  }
}
module.exports = prePlaceOrder
