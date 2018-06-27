<template>
  <div>
    <div class="content" v-if="showContent"></div>
    <div class="alphabet-wrap">
        <span class="alphabet" v-for="(el, prop) in cityCodes" :key="prop"
        @click="alphabetChange(el)">{{prop}}</span>
    </div>
    <div class="city-wrap">
      <span class="city"
      v-for="(el, idx) in alphabetZone"
      :key="idx">{{alphabetZone.length}}</span>
    </div>
  </div>
</template>
<script>
const renderSeat = require('../../tb/renderSeat/index')
import mapConfig from '../javascript/script/seatMapConfig'
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
export default {
  data() {
    return {
        showContent: false,
        cityCodes: null,
        alphabetZone: [],
        message: ''
    }
  },
  mounted() {},
  beforeDestroy() {},
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
  mounted() {
    this.showContent = true
    this.querySchedule().then(this.getAllRegion)
  }
}
</script>
<style lang="scss" scoped>
</style>
