<template>
  <div>
    <div class="row">
      <span v-if="showArrow" class="move-arrow move-left c-center"
      @click="move('left')">left</span>
      <div ref="window" class="window">
        <div ref="wrap" class="wrap" :style="wrapStyle">
          <span class="list-item c-xsm-gap" v-for="(el, prop) in componentData"
          :key="prop" @click="currentItemChange(el, prop)"
          >{{ displayProp ? el[displayProp] : prop }}</span>
        </div>
      </div>
      <span v-if="showArrow" class="move-arrow move-right c-center"
      @click="move('right')">right</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    displayProp: { type: String, default: '' },
    componentData: { type: [Object, Array] },
    currentItemChange: { type: Function }
  },
  data() {
    return {
      wrapOffset: 0
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
    move(dir) {
      const step = 190
      const diff =
        this.$refs['wrap'].clientWidth - this.$refs['window'].clientWidth
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
.window {
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
  @include circle(3em);
  line-height: 3em;
  text-align: center;
  background-color: $aqua;
  &:hover {
    cursor: pointer;
  }
}
.move-arrow {
  @include circle(3em);
  @extend .c-pointer;
  position: absolute;
  top: $xsm-gap;
  line-height: 3em;
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
