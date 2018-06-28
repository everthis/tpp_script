<template>
  <div>
    <div class="row">
      <span class="move-arrow move-left c-center c-non-select"
      v-if="showArrow" @click="move('left')">
        <inline-svg-icon :src="leftArrow"
        :width="iconLen" :height="iconLen"></inline-svg-icon>
      </span>
      <div ref="list-window" class="list-window">
        <div ref="wrap" class="wrap" :style="wrapStyle">
          <span
          :class="['list-item', 'c-xsm-gap', 'c-sm-pad', 'c-ellipsis', currentItem === el ? 'active' : '']"
          v-for="(el, prop) in componentData" :key="prop"
          @click="currentItemChangeWrap(el, prop)"
          >{{ displayProp ? el[displayProp] : prop }}</span>
        </div>
      </div>
      <span class="move-arrow move-right c-center c-non-select"
      v-if="showArrow" @click="move('right')">
        <inline-svg-icon :src="rightArrow"
        :width="iconLen" :height="iconLen"></inline-svg-icon>
      </span>
    </div>
  </div>
</template>
<script>
import leftArrow from '../asset/left-arrow.svg'
import rightArrow from '../asset/right-arrow.svg'
import InlineSvgIcon from './inlineSvgIcon'
export default {
  components: { InlineSvgIcon },
  props: {
    displayProp: { type: String, default: '' },
    componentData: { type: [Object, Array] },
    currentItemChange: { type: Function }
  },
  data() {
    return {
      iconLen: '1.2em',
      wrapOffset: 0,
      currentItem: null,
      leftArrow,
      rightArrow
    }
  },
  watch: {
    componentData() {
      this.wrapOffset = 0
    }
  },
  computed: {
    showArrow: function() {
      if (this.componentData == null) return false
      return this.displayProp.length === 0
        ? Object.keys(this.componentData).length > 0
        : this.componentData.length > 0
    },
    wrapStyle: function() {
      return {
        transform: `translate3d(${this.wrapOffset}px,0,0)`
      }
    }
  },
  methods: {
    currentItemChangeWrap(el, prop) {
      this.currentItem = el
      this.currentItemChange(el, prop)
    },
    move(dir) {
      const step = 190
      const diff =
        this.$refs['wrap'].clientWidth - this.$refs['list-window'].clientWidth
      const diffWidth = diff >= 0 ? diff : 0
      if (dir === 'left') {
        const tmp = this.wrapOffset + step
        this.wrapOffset = tmp >= 0 ? 0 : tmp
      } else if (dir === 'right') {
        const tmp = this.wrapOffset - step
        this.wrapOffset = tmp <= -diffWidth ? -diffWidth : tmp
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../stylesheet/partial/var';
@import '../stylesheet/partial/mixin';
@import '../stylesheet/partial/placeholder';
@import '../stylesheet/partial/c';
.row {
  display: inline-block;
  position: relative;
  margin: 0 4em;
}
.list-window {
  max-width: 40em;
  overflow: hidden;
}
.wrap {
  display: inline-block;
  white-space: nowrap;
  will-change: transform;
  transition: transform $transiton-duration $timing-function;
}
.list-item {
  display: inline-block;
  min-width: 3em;
  border-radius: 1.5em;
  line-height: calc(3em - 2 * #{$xsm-pad});
  text-align: center;
  user-select: none;
  background-color: $aqua;
  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: $blue;
    color: $white;
  }
}
.move-arrow {
  @include circle(3em);
  @extend .c-pointer;
  position: absolute;
  top: $xsm-gap;
  padding: 0.9em;
  background-color: $white;
  box-shadow: 1px 1px 4px 1px $gray;
}
.move-left {
  left: -3.4em;
}
.move-right {
  right: -3.4em;
}
</style>
