const { availableConsecutiveSeatsInRow } = require('../util/chooseDesiredSeat')
const genSeats = require('./data/genSeats')
// test sequence: 101110011110011
const arr = genSeats([
  ['1', '0', '1', '1', '1', '0', '0', '1', '1', '1', '1', '0', '0', '1', '1']
]).data.returnValue.hallSeatMap.sectionSeatMapList[0].seats

test('the number of all available consecutive seats in a row must be right', () => {
  expect(availableConsecutiveSeatsInRow(arr, 2).length).toBe(6)
  expect(availableConsecutiveSeatsInRow(arr, 3).length).toBe(3)
  expect(availableConsecutiveSeatsInRow(arr, 4).length).toBe(1)
  expect(availableConsecutiveSeatsInRow(arr, 5).length).toBe(0)
})

test('all found consecutive seats in a row must be exact what expected', () => {
  expect(availableConsecutiveSeatsInRow(arr, 3)).toMatchObject([
    [arr[2], arr[3], arr[4]],
    [arr[7], arr[8], arr[9]],
    [arr[8], arr[9], arr[10]]
  ])
  expect(availableConsecutiveSeatsInRow(arr, 4)).toMatchObject([
    [arr[7], arr[8], arr[9], arr[10]]
  ])
  expect(availableConsecutiveSeatsInRow(arr, 5)).toMatchObject([])
})
