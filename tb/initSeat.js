const renderSeat = require('./renderSeat/index')
const apiData = require('../json/singleHallCenterHalfOccupied.json')
import css from './tpp.css'
const mapConfig = {
  floorDistance: 48,
  legendHeight: 34,
  margin: {
    bottom: 8,
    left: 28,
    right: 28,
    top: 8
  },
  maxSize: 4096,
  radarSeatHeight: 4,
  radarSeatMargin: 2,
  radarSeatWidth: 4,
  screenHeight: 37,
  seatHeight: 40,
  seatMargin: 8,
  seatWidth: 40
}
function anoymous() {}
function initSeat(data) {
  new renderSeat({
    container: '#J_xseat',
    seatData: data,
    seatImgs: {
      Sprite: '//gw.alicdn.com/tfs/TB1_eqPfntYBeNjy1XdXXXXyVXa-512-800.png'
    },
    maxScale: 1,
    viewWidth: document.body.clientWidth,
    viewHeight: window.innerHeight,
    mapConfig: mapConfig,
    selectedSeatIds: [
      '0000000000000001-3-10',
      '0000000000000001-3-09',
      '0000000000000001-3-08',
      '0000000000000001-3-07',
      '0000000000000001-3-06',
      '0000000000000001-3-05',
      '0000000000000001-6-10',
      '0000000000000001-6-09',
      '0000000000000001-6-08',
      '0000000000000001-6-07',
      '0000000000000001-6-06',
      '0000000000000001-6-05'
    ],
    beforeSelectSeats: anoymous,
    afterSelectSeats: anoymous
  })
}

initSeat(apiData.data.returnValue)
