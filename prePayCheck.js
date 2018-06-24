function prePayCheck(tppUserSimpleApiData, { scheduleId, seatIDsArr }) {
  const userNumId = tppUserSimpleApiData.data.userNumId
  return Promise.resolve({
    scheduleId,
    lockSeatApplyKey: `${userNumId}_${scheduleId}_[${seatIDsArr.join(', ')}]`,
    seatIDs: seatIDsArr.join('|')
  })
}
module.exports = prePayCheck
