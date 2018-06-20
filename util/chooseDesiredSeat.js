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
/**
 * figure out rows
 * arr is sorted
 * @param {Array} arr
 */
function calcBestRows(arr, arrLen = arr.length) {
  if (arrLen <= 8) return arr
  const numberOfOmittedRowsFromLast = 3
  const numberOfRowsInFrontOfPivot = 4
  const pivot = Math.floor(arrLen / 2)
  const result = []
  for (let i = 0; i < arrLen; i++) {
    i >= pivot - numberOfRowsInFrontOfPivot &&
    i < arrLen - numberOfOmittedRowsFromLast
      ? result.push(arr[i])
      : null
  }
  return result
}
/**
 * figure out the best seats of a row
 * @param {Array} arr
 * @return {Array}
 */
function resultOfRow(arr, num) {
  return availableConsecutiveSeatsInRow(bestInRow(arr), num)
}
function bestInRow(arr, arrLen = arr.length) {
  const radius = Math.floor(arrLen / 5)
  const pivot = Math.floor(arrLen / 2)
  return arr.filter((el, idx) => idx >= pivot - radius && idx <= pivot + radius)
}
function availableConsecutiveSeatsInRow(arr, num) {
  const result = []
  const arrLen = arr.length
  let consecutiveAvaiableSeatNum = 0
  let isPreviousSeatAvaiable = false

  for (let i = 0; i < arrLen; i++) {
    if (arr[i].status === '1') {
      consecutiveAvaiableSeatNum += 1
      isPreviousSeatAvaiable = true
      if (i === arrLen - 1) {
        result.push(
          ...subConsecutiveArr(arr, [i, consecutiveAvaiableSeatNum], num)
        )
      }
    } else {
      if (isPreviousSeatAvaiable === true) {
        result.push(
          ...subConsecutiveArr(arr, [i, consecutiveAvaiableSeatNum], num)
        )
      }
      consecutiveAvaiableSeatNum = 0
      isPreviousSeatAvaiable = false
    }
  }
  return result
}
/**
 *
 * @param {Array} arr
 * @param {Array} idxPrev
 * @param {Number} subArrLen
 */
function subConsecutiveArr(arr, idxPrev, subArrLen) {
  const slicedArr = arr.slice(idxPrev[0] - idxPrev[1], idxPrev[0])
  if (slicedArr.length < subArrLen) {
    return []
  }
  const result = []
  for (let i = 0; i <= slicedArr.length - subArrLen; i++) {
    result.push(slicedArr.slice(i, subArrLen + i))
  }
  return result
}
function isSold(obj) {
  return obj.status === '0' ? true : false
}
/**
 * arr is the element of sectionSeatMapList
 * @param {Object} obj
 */
function bestInHall(obj, num) {
  const { seats } = obj
  const seatsMap = {}
  seats.forEach(
    (el, idx) =>
      seatsMap[el.row] ? seatsMap[el.row].push(el) : (seatsMap[el.row] = [el])
  )
  // front to rear
  const rows = Object.keys(seatsMap).sort((a, b) => +a - +b)
  rows.forEach((el, idx) => {
    // left to right
    seatsMap[el] = seatsMap[el].sort((a, b) => +a.column - +b.column)
  })
  const result = []
  calcBestRows(rows.map(el => seatsMap[el])).forEach(row =>
    result.push(...resultOfRow(row, num))
  )
  return result
}

function chooseBestSeat(apiData, config = {}) {
  const result = {}
  const { ticketNum: num } = config
  const hallSeat = apiData.data.returnValue.hallSeatMap
  // pick api recommendSeatMap first
  result.recommend = pickApiRecommend(hallSeat.sectionSeatMapList)
  // choose best in general
  const generalDesiredSeats = []
  hallSeat.sectionSeatMapList.forEach(hall => {
    generalDesiredSeats.push(...bestInHall(hall, num))
  })
  result.general = generalDesiredSeats
  return result
}
module.exports = {
  calcBestRows,
  chooseBestSeat,
  bestInRow,
  availableConsecutiveSeatsInRow
}
