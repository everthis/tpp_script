<template>
  <div>
    <windowed-list :component-data="cityCodes"
    :current-item-change="alphabetChange"></windowed-list>
    <windowed-list :component-data="alphabetZone" :display-prop="displayProp"
    :current-item-change="alphabetChange"></windowed-list>
  </div>
</template>
<script>
import WindowedList from './windowedList'
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
    move(dir) {
      const step = 190
      const diff =
        this.$refs['alphabet-wrap'].clientWidth -
        this.$refs['alphabet-window'].clientWidth
      const diffWidth = diff >= 0 ? diff : 0
      if (dir === 'left') {
        const tmp = this.wrapOffset + step
        this.wrapOffset = tmp >= 0 ? 0 : tmp
      } else if (dir === 'right') {
        const tmp = this.wrapOffset - step
        this.wrapOffset = tmp <= -diffWidth ? -diffWidth : tmp
      }
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
.alphabet-row {
  display: inline-block;
  position: relative;
  margin: 0 4em;
}
.alphabet-window {
  max-width: 40em;
  overflow: hidden;
}
.alphabet-wrap {
  display: inline-block;
  white-space: nowrap;
  will-change: transform;
  transition: transform $transiton-duration $timing-function;
}
.alphabet {
  display: inline-block;
  @include square(3em);
  line-height: 3em;
  border-radius: 50%;
  text-align: center;
  background-color: $aqua;
  &:hover {
    cursor: pointer;
  }
}
.move-arrow {
  @extend .c-pointer;
  position: absolute;
  top: $xsm-gap;
  display: inline-block;
  @include square(3em);
  line-height: 3em;
  background-color: $white;
  border-radius: 50%;
  box-shadow: 1px 1px 4px 1px $gray;
}
.move-left {
  left: -3.4em;
}
.move-right {
  right: -3.4em;
}
.city-wrap {
  white-space: nowrap;
}
.city {
  display: inline-block;
  background-color: $teal;
}
</style>
