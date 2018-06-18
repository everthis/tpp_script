/**
 * arr is sectionSeatMapList
 * @param {Array} arr
 */
function pickApiRecommend(arr) {
  const result = {}
  arr.map(section => section.recommendSeatMap).forEach(element => {
    for (const key in element) {
      if (element.hasOwnProperty(key) && element[key].status === '1') {
        result[key]
          ? result[key].push(element[key])
          : (result[key] = [element[key]])
      }
    }
  })
  return result
}
function bestInHall() {}
function chooseBestSeat(apiData, request) {
  const result = {}
  const hallSeat = apiData.data.returnValue.hallSeatMap
  // pick api recommendSeatMap first
  result.recommend = pickApiRecommend(hallSeat.sectionSeatMapList)
  return result
}
module.exports = chooseBestSeat
