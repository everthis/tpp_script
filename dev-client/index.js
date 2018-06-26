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
    cityCodes: null,
    alphabetZone: [],
    message: ''
  },
  methods: {
    querySchedule() {
      return fetch('/tpp/schedules').then(r => r.json())
    },
    getAllRegion() {
      return fetch('/tpp/allRegion')
        .then(r => r.json())
        .then(d => (this.cityCodes = d.data.returnValue))
    },
    alphabetChange(val) {
      this.alphabetZone = val
      console.log(val)
    },
    formatRegion() {}
  },
  created: function() {},
  mounted() {
    this.showContent = true
    this.querySchedule().then(this.getAllRegion)
  }
})
