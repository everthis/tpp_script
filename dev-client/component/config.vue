<template>
  <div class="row c-gap-top">
    <span class="ticket-num item">
      <b>票数: </b>
      <i class="c-pointer icon" @click="setTicketNum('-1')">
        <inline-svg-icon :src="substractIcon"
        :width="iconLen" :height="iconLen"></inline-svg-icon>
      </i>
      <input type="number" class="num-input" min="0" v-model="ticketNum">
      <i class="c-pointer icon" @click="setTicketNum('+1')">
        <inline-svg-icon :src="addIcon"
        :width="iconLen" :height="iconLen"></inline-svg-icon>
      </i>
    </span>
    <span class="consecutive-in-row item">
      <b>单排连续: </b>
      <input type="radio" id="consecutiveInRowTrue" :disabled="disabled"
      name="consecutiveInRow" value=true v-model="consecutiveInRow">
      <label for="consecutiveInRowTrue">true</label>
      <input type="radio" id="consecutiveInRowFalse" :disabled="disabled"
      name="consecutiveInRow" value=false v-model="consecutiveInRow">
      <label for="consecutiveInRowFalse">false</label>
    </span>
    <span class="only-cosy-zone item">
      <b>只选中间: </b>
      <input type="radio" id="onlyCosyZoneTrue" :disabled="disabled"
      name="onlyCosyZone" value=true v-model='onlyCosyZone'>
      <label for="onlyCosyZoneTrue">true</label>
      <input type="radio" id="onlyCosyZoneFalse" :disabled="disabled"
      name="onlyCosyZone" value=false v-model='onlyCosyZone'>
      <label for="onlyCosyZoneFalse">false</label>
    </span>
  </div>
</template>
<script>
import addIcon from '../asset/add.svg'
import substractIcon from '../asset/substract.svg'
import InlineSvgIcon from './inlineSvgIcon'
export default {
  components: { InlineSvgIcon },
  props: {
    setConfigFn: { type: Function, default: function() {} },
    initConfig: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      disabled: true,
      iconLen: '1em',
      ticketNum: this.initConfig.ticketNum || 2,
      consecutiveInRow:
        this.initConfig.consecutiveInRow != null
          ? this.initConfig.consecutiveInRow
          : true,
      onlyCosyZone:
        this.initConfig.onlyCosyZone != null
          ? this.initConfig.onlyCosyZone
          : true,
      addIcon,
      substractIcon
    }
  },
  watch: {
    ticketNum: function(val) {
      this.setConfigFn('ticketNum', val)
    },
    consecutiveInRow: function(val) {
      this.setConfigFn('consecutiveInRow', val)
    },
    onlyCosyZone: function(val) {
      this.setConfigFn('onlyCosyZone', val)
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    setTicketNum(val) {
      if (val === '-1') {
        this.ticketNum = this.ticketNum === 0 ? 0 : this.ticketNum - 1
      } else if (val === '+1') {
        this.ticketNum += 1
      } else {
        this.ticketNum = val
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../stylesheet/partial/var';
@import '../stylesheet/partial/function';
@import '../stylesheet/partial/c';
.icon {
  display: inline-block;
}
.num-input {
  display: inline-block;
  width: 3em;
  padding: 0 0.5em;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: $black-border;
}
.item {
  display: inline-block;
  & + & {
    margin-left: 2em;
  }
  b + input {
    @extend .c-gap-left;
  }
  label + input {
    @extend .c-gap-left-sm;
  }
}
input[type='radio'] {
  margin-top: -1px;
  vertical-align: middle;
  &:disabled + label {
    color: $gray;
  }
}
</style>
