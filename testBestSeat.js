const seats = require('./seat.json')
const multiHallSeats = require('./multiHallSeat.json')
const {
  chooseBestSeat,
  calcBestRows,
  bestInRow
} = require('./util/chooseDesiredSeat')
const logPP = obj => console.log(JSON.stringify(obj, null, 2))
// const res = chooseBestSeat(seats)
const res2 = chooseBestSeat(multiHallSeats)
// logPP(res)
// logPP(res2)
console.log(res2)
const testRows = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25'
]
logPP(calcBestRows(testRows))

const rowSeats = [
  {
    area: 'DS',
    column: '1',
    extId: 'DS191601',
    flag: '0',
    name: '15排35座',
    row: '16',
    rowName: '15',
    seatId: 'DS191601',
    status: '0'
  },
  {
    area: 'DS',
    column: '2',
    extId: 'DS191602',
    flag: '0',
    name: '15排33座',
    row: '16',
    rowName: '15',
    seatId: 'DS191602',
    status: '0'
  },
  {
    area: 'DS',
    column: '3',
    extId: 'DS191603',
    flag: '0',
    name: '15排31座',
    row: '16',
    rowName: '15',
    seatId: 'DS191603',
    status: '0'
  },
  {
    area: 'DS',
    column: '4',
    extId: 'DS191604',
    flag: '0',
    name: '15排29座',
    row: '16',
    rowName: '15',
    seatId: 'DS191604',
    status: '0'
  },
  {
    area: 'DS',
    column: '5',
    extId: 'DS191605',
    flag: '0',
    name: '15排27座',
    row: '16',
    rowName: '15',
    seatId: 'DS191605',
    status: '0'
  },
  {
    area: 'DS',
    column: '6',
    extId: 'DS191606',
    flag: '0',
    name: '15排25座',
    row: '16',
    rowName: '15',
    seatId: 'DS191606',
    status: '0'
  },
  {
    area: 'DS',
    column: '7',
    extId: 'DS191607',
    flag: '0',
    name: '15排23座',
    row: '16',
    rowName: '15',
    seatId: 'DS191607',
    status: '0'
  },
  {
    area: 'DS',
    column: '8',
    extId: 'DS191608',
    flag: '0',
    name: '15排21座',
    row: '16',
    rowName: '15',
    seatId: 'DS191608',
    status: '0'
  },
  {
    area: 'DS',
    column: '9',
    extId: 'DS191609',
    flag: '0',
    name: '15排19座',
    row: '16',
    rowName: '15',
    seatId: 'DS191609',
    status: '0'
  },
  {
    area: 'DS',
    column: '10',
    extId: 'DS191610',
    flag: '0',
    name: '15排17座',
    row: '16',
    rowName: '15',
    seatId: 'DS191610',
    status: '0'
  },
  {
    area: 'DS',
    column: '11',
    extId: 'DS191611',
    flag: '0',
    name: '15排15座',
    row: '16',
    rowName: '15',
    seatId: 'DS191611',
    status: '0'
  },
  {
    area: 'DS',
    column: '12',
    extId: 'DS191612',
    flag: '0',
    name: '15排13座',
    row: '16',
    rowName: '15',
    seatId: 'DS191612',
    status: '0'
  },
  {
    area: 'DS',
    column: '14',
    extId: 'DS191614',
    flag: '0',
    name: '15排11座',
    row: '16',
    rowName: '15',
    seatId: 'DS191614',
    status: '0'
  },
  {
    area: 'DS',
    column: '15',
    extId: 'DS191615',
    flag: '0',
    name: '15排9座',
    row: '16',
    rowName: '15',
    seatId: 'DS191615',
    status: '0'
  },
  {
    area: 'DS',
    column: '16',
    extId: 'DS191616',
    flag: '0',
    name: '15排7座',
    row: '16',
    rowName: '15',
    seatId: 'DS191616',
    status: '0'
  },
  {
    area: 'DS',
    column: '17',
    extId: 'DS191617',
    flag: '0',
    name: '15排5座',
    row: '16',
    rowName: '15',
    seatId: 'DS191617',
    status: '0'
  },
  {
    area: 'DS',
    column: '18',
    extId: 'DS191618',
    flag: '0',
    name: '15排3座',
    row: '16',
    rowName: '15',
    seatId: 'DS191618',
    status: '0'
  },
  {
    area: 'DS',
    column: '19',
    extId: 'DS191619',
    flag: '0',
    name: '15排1座',
    row: '16',
    rowName: '15',
    seatId: 'DS191619',
    status: '0'
  },
  {
    area: 'DS',
    column: '20',
    extId: 'DS191620',
    flag: '0',
    name: '15排2座',
    row: '16',
    rowName: '15',
    seatId: 'DS191620',
    status: '0'
  },
  {
    area: 'DS',
    column: '21',
    extId: 'DS191621',
    flag: '0',
    name: '15排4座',
    row: '16',
    rowName: '15',
    seatId: 'DS191621',
    status: '0'
  },
  {
    area: 'DS',
    column: '22',
    extId: 'DS191622',
    flag: '0',
    name: '15排6座',
    row: '16',
    rowName: '15',
    seatId: 'DS191622',
    status: '0'
  },
  {
    area: 'DS',
    column: '23',
    extId: 'DS191623',
    flag: '0',
    name: '15排8座',
    row: '16',
    rowName: '15',
    seatId: 'DS191623',
    status: '0'
  },
  {
    area: 'DS',
    column: '24',
    extId: 'DS191624',
    flag: '0',
    name: '15排10座',
    row: '16',
    rowName: '15',
    seatId: 'DS191624',
    status: '0'
  },
  {
    area: 'DS',
    column: '25',
    extId: 'DS191625',
    flag: '0',
    name: '15排12座',
    row: '16',
    rowName: '15',
    seatId: 'DS191625',
    status: '0'
  },
  {
    area: 'DS',
    column: '27',
    extId: 'DS191627',
    flag: '0',
    name: '15排14座',
    row: '16',
    rowName: '15',
    seatId: 'DS191627',
    status: '0'
  },
  {
    area: 'DS',
    column: '28',
    extId: 'DS191628',
    flag: '0',
    name: '15排16座',
    row: '16',
    rowName: '15',
    seatId: 'DS191628',
    status: '0'
  },
  {
    area: 'DS',
    column: '29',
    extId: 'DS191629',
    flag: '0',
    name: '15排18座',
    row: '16',
    rowName: '15',
    seatId: 'DS191629',
    status: '0'
  },
  {
    area: 'DS',
    column: '30',
    extId: 'DS191630',
    flag: '0',
    name: '15排20座',
    row: '16',
    rowName: '15',
    seatId: 'DS191630',
    status: '0'
  },
  {
    area: 'DS',
    column: '31',
    extId: 'DS191631',
    flag: '0',
    name: '15排22座',
    row: '16',
    rowName: '15',
    seatId: 'DS191631',
    status: '0'
  },
  {
    area: 'DS',
    column: '32',
    extId: 'DS191632',
    flag: '0',
    name: '15排24座',
    row: '16',
    rowName: '15',
    seatId: 'DS191632',
    status: '0'
  },
  {
    area: 'DS',
    column: '33',
    extId: 'DS191633',
    flag: '0',
    name: '15排26座',
    row: '16',
    rowName: '15',
    seatId: 'DS191633',
    status: '0'
  },
  {
    area: 'DS',
    column: '34',
    extId: 'DS191634',
    flag: '0',
    name: '15排28座',
    row: '16',
    rowName: '15',
    seatId: 'DS191634',
    status: '0'
  },
  {
    area: 'DS',
    column: '35',
    extId: 'DS191635',
    flag: '0',
    name: '15排30座',
    row: '16',
    rowName: '15',
    seatId: 'DS191635',
    status: '0'
  },
  {
    area: 'DS',
    column: '36',
    extId: 'DS191636',
    flag: '0',
    name: '15排32座',
    row: '16',
    rowName: '15',
    seatId: 'DS191636',
    status: '1'
  },
  {
    area: 'DS',
    column: '37',
    extId: 'DS191637',
    flag: '0',
    name: '15排34座',
    row: '16',
    rowName: '15',
    seatId: 'DS191637',
    status: '1'
  },
  {
    area: 'DS',
    column: '38',
    extId: 'DS191638',
    flag: '0',
    name: '15排36座',
    row: '16',
    rowName: '15',
    seatId: 'DS191638',
    status: '1'
  }
]

logPP(bestInRow(rowSeats))
