<template>
  <div>
    <windowed-list :component-data="cityCodes"
    :current-item-change="alphabetChange"></windowed-list>
    <windowed-list :component-data="alphabetZone" :display-prop="displayProp"
    :current-item-change="cityChange"></windowed-list>
  </div>
</template>
<script>
import WindowedList from './windowedList'
const renderSeat = require('../../tb/renderSeat/index')
import mapConfig from '../javascript/script/seatMapConfig'
import serialize from '../javascript/common/serialize'
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
  components: { WindowedList },
  data() {
    return {
      showContent: false,
      cityCodes: null,
      alphabetZone: [],
      wrapOffset: 0,
      displayProp: 'regionName',
      message: ''
    }
  },
  computed: {
    wrapStyle: function() {
      return {
        transform: `translate3d(${this.wrapOffset}px,0,0)`
      }
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
    cityChange(val) {
      console.log(val)
      const payload = {
        page: 1,
        pageSize: 100,
        cityCode: val.cityCode
      }
      return this.cfetch(`/tpp/getShowsByCityCode?${serialize(payload)}`)
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
@import '../stylesheet/partial/var';
@import '../stylesheet/partial/mixin';
@import '../stylesheet/partial/placeholder';
@import '../stylesheet/partial/c';

.city-wrap {
  white-space: nowrap;
}
.city {
  display: inline-block;
  background-color: $teal;
}
</style>
