import Vue from 'vue'
const renderSeat = require('../tb/renderSeat/index')
import scss from './index.scss'
import mapConfig from './seatMapConfig'
function anoymous() {}
function initSeat(data, selectedSeatIds) {
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
    selectedSeatIds,
    beforeSelectSeats: anoymous,
    afterSelectSeats: anoymous
  })
}
const app = new Vue({
  el: '#app',
  data: {
    showContent: false,
    message: ''
  },
  methods: {
    querySchedule() {
      return fetch('/tpp/schedules').then(r => r.json())
    },
    test() {
      return fetch('/tpp/test').then(r => r.json())
    }
  },
  created: function() {},
  mounted() {
    this.showContent = true
    this.querySchedule().then(this.test)
  }
})
