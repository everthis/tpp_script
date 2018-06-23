const {
  availableConsecutiveSeatsInRow,
  chooseBestSeat
} = require('../util/chooseDesiredSeat')
const genSeats = require('./data/genSeats')
describe('best available seat', () => {
  test('a', () => {
    const matrix = [['1', '1', '1', '0', '0'], ['0', '0', '0', '1', '1']]
    const apiData = genSeats(matrix)
    const num3choice = chooseBestSeat(apiData, { ticketNum: 3 })
    expect(num3choice.general.length).toBe(1)
    const num2choice = chooseBestSeat(apiData, { ticketNum: 2 })
    // console.log(JSON.stringify(num2choice, null, 2))
    expect(num2choice.general.length).toBe(3)
  })
})
