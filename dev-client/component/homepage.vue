<template>
  <div class="c-center">
    <windowed-list :component-data="cityCodes"
    :current-item-change="alphabetChange"></windowed-list>
    <windowed-list :component-data="alphabetZone" :display-prop="displayProp"
    :current-item-change="cityChange"></windowed-list>
    <windowed-list :component-data="listOfShow" :display-prop="showName"
    :current-item-change="showChange"></windowed-list>
    <windowed-list :component-data="listOfCinema" :display-prop="cinemaName"
    :current-item-change="cinemaChange"></windowed-list>
    <windowed-list :component-data="listOfScheduleOfSpecificShow"
    :display-prop="scheduleName"
    :current-item-change="scheduleChange"></windowed-list>
    <config :show="showConfig" :set-config-fn="setConfigFn"
    :initConfig="chooseSeatConfig"></config>
  </div>
</template>
<script>
import WindowedList from './windowedList'
import Config from './config'
const renderSeat = require('../../tb/renderSeat/index')
const {
  chooseBestSeat,
  getSelectedIds
} = require('../../util/chooseDesiredSeat')
import mapConfig from '../javascript/script/seatMapConfig'
import serialize from '../javascript/common/serialize'
function anoymous() {
  return Promise.resolve()
}

function initSeat(data, selectedSeatIds) {
  new renderSeat({
    container: '#J_xseat',
    seatData: data,
    seatImgs: {
      Sprite: '//gw.alicdn.com/tfs/TB1_eqPfntYBeNjy1XdXXXXyVXa-512-800.png'
    },
    maxScale: 1,
    viewWidth: 14 * 52,
    viewHeight: 900,
    mapConfig: mapConfig,
    selectedSeatIds,
    beforeSelectSeats: anoymous,
    afterSelectSeats: anoymous
  })
}
export default {
  components: { WindowedList, Config },
  data() {
    return {
      showConfig: true,
      showContent: false,
      cityCodes: null,
      alphabetZone: [],
      listOfShow: [],
      listOfCinema: [],
      listOfScheduleOfSpecificShow: [],
      cinemaName: 'cinemaName',
      showName: 'showName',
      scheduleName: 'compoundDate',
      wrapOffset: 0,
      displayProp: 'regionName',
      currentCityCode: undefined,
      currentShowId: undefined,
      chooseSeatConfig: {
        ticketNum: 3,
        consecutiveInRow: true,
        onlyCosyZone: true
      },
      scheduleSeatApiData: null
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    setConfigFn(type, val) {
      this.chooseSeatConfig[type] = val
      this.chooseSeatConfigChangedCb(this.chooseSeatConfig)
    },
    resetListOfShow() {
      this.listOfShow = []
    },
    resetListOfCinema() {
      this.listOfCinema = []
    },
    resetListOfScheduleOfSpecificShow() {
      this.listOfScheduleOfSpecificShow = []
    },
    querySchedule() {
      return fetch('/tpp/schedules').then(r => r.json())
    },
    getAllRegion() {
      return fetch('/tpp/allRegion')
        .then(r => r.json())
        .then(d => (this.cityCodes = d.data.returnValue))
    },
    alphabetChange(val) {
      this.resetListOfShow()
      this.resetListOfCinema()
      this.resetListOfScheduleOfSpecificShow()
      this.alphabetZone = val
    },
    cityChange(val) {
      this.resetListOfCinema()
      this.resetListOfScheduleOfSpecificShow()
      this.currentCityCode = val.cityCode
      const payload = {
        page: 1,
        pageSize: 500,
        cityCode: val.cityCode
      }
      return this.cfetch(`/tpp/getShowsByCityCode?${serialize(payload)}`).then(
        d => (this.listOfShow = d.data.returnValue)
      )
    },
    showChange(val) {
      this.resetListOfScheduleOfSpecificShow()
      this.currentShowId = val.id
      const payload = {
        showId: val.id,
        pageIndex: 1,
        pageSize: 500,
        cityCode: this.currentCityCode
      }
      return this.cfetch(`/tpp/getCinemaListInPage?${serialize(payload)}`).then(
        d => (this.listOfCinema = d.data.returnValue.cinemas)
      )
    },
    cinemaChange(val) {
      const payload = { cinemaId: val.cinemaId }
      return this.cfetch(`/tpp/getCinemaSchedule?${serialize(payload)}`).then(
        d =>
          (this.listOfScheduleOfSpecificShow = this.filterAndCombineSchedule(
            d.data.returnValue.showScheduleMap[this.currentShowId]
          ))
      )
    },
    filterAndCombineSchedule(arr) {
      const result = []
      for (let i = 0; i < arr.length; i++) {
        const dateDesc = arr[i].dateDesc
        for (let j = 0; j < arr[i].scheduleVos.length; j++) {
          const schedule = arr[i].scheduleVos[j]
          result.push(
            Object.assign({}, schedule, {
              dateDesc,
              compoundDate: `${dateDesc} ${schedule.openTime}`
            })
          )
        }
      }
      return result
    },
    scheduleChange(val) {
      const payload = {
        scheduleId: val.scheduleId
      }
      return this.cfetch(`/tpp/queryScheduleSeat?${serialize(payload)}`).then(
        d => {
          this.scheduleSeatApiData = d
          this.chooseSeatConfigChangedCb(this.chooseSeatConfig)
        }
      )
    },
    chooseSeatConfigChangedCb(obj) {
      const targets = chooseBestSeat(this.scheduleSeatApiData, obj)
      initSeat(
        this.scheduleSeatApiData.data.returnValue,
        getSelectedIds(targets)
      )
    }
  },
  mounted() {
    this.showContent = true
    this.getAllRegion()
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
