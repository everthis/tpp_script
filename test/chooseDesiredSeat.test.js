const { availableConsecutiveSeatsInRow } = require('../util/chooseDesiredSeat')
// test sequence: 101110011110011
const arr = [
  {
    seatId: 'DS191612',
    status: '1'
  },
  {
    seatId: 'DS191614',
    status: '0'
  },
  {
    seatId: 'DS191615',
    status: '1'
  },
  {
    seatId: 'DS191616',
    status: '1'
  },
  {
    seatId: 'DS191617',
    status: '1'
  },
  {
    seatId: 'DS191618',
    status: '0'
  },
  {
    seatId: 'DS191619',
    status: '0'
  },
  {
    seatId: 'DS191620',
    status: '1'
  },
  {
    seatId: 'DS191621',
    status: '1'
  },
  {
    seatId: 'DS191622',
    status: '1'
  },
  {
    seatId: 'DS191623',
    status: '1'
  },
  {
    seatId: 'DS191624',
    status: '0'
  },
  {
    seatId: 'DS191625',
    status: '0'
  },
  {
    seatId: 'DS191627',
    status: '1'
  },
  {
    seatId: 'DS191628',
    status: '1'
  }
]

test('the number of all available consecutive seats in a row must be right', () => {
  expect(availableConsecutiveSeatsInRow(arr, 2).length).toBe(6)
  expect(availableConsecutiveSeatsInRow(arr, 3).length).toBe(3)
  expect(availableConsecutiveSeatsInRow(arr, 4).length).toBe(1)
  expect(availableConsecutiveSeatsInRow(arr, 5).length).toBe(0)
})

test('all found consecutive seats in a row must be exact what expected', () => {
  expect(availableConsecutiveSeatsInRow(arr, 3)).toMatchObject([
    [
      {
        seatId: 'DS191615',
        status: '1'
      },
      {
        seatId: 'DS191616',
        status: '1'
      },
      {
        seatId: 'DS191617',
        status: '1'
      }
    ],
    [
      {
        seatId: 'DS191620',
        status: '1'
      },
      {
        seatId: 'DS191621',
        status: '1'
      },
      {
        seatId: 'DS191622',
        status: '1'
      }
    ],
    [
      {
        seatId: 'DS191621',
        status: '1'
      },
      {
        seatId: 'DS191622',
        status: '1'
      },
      {
        seatId: 'DS191623',
        status: '1'
      }
    ]
  ])
  expect(availableConsecutiveSeatsInRow(arr, 4)).toMatchObject([
    [
      {
        seatId: 'DS191620',
        status: '1'
      },
      {
        seatId: 'DS191621',
        status: '1'
      },
      {
        seatId: 'DS191622',
        status: '1'
      },
      {
        seatId: 'DS191623',
        status: '1'
      }
    ]
  ])
  expect(availableConsecutiveSeatsInRow(arr, 5)).toMatchObject([])
})
