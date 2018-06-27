<template>
  <span :class="wrapClass" :style="wrapStyle" @click="clickFn">
    <svg :class="['c-icon-fit', svgClass]"><use :xlink:href="useHref"></use></svg>
  </span>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '1.2em'
    },
    height: {
      type: String,
      default: '1.2em'
    },
    spanClass: {
      type: String,
      default: 'c-default-icon-wrap'
    },
    clickFn: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {}
  },
  computed: {
    wrapClass() {
      return `icon-${this.name}-wrap c-pointer ${this.spanClass}`
    },
    wrapStyle() {
      return {
        display: 'inline-block',
        color: 'black',
        height: this.height,
        width: this.width
      }
    },
    svgClass() {
      return `c-icon icon-${this.name}`
    },
    useHref() {
      return `#icon-${this.name}`
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
@import '../stylesheet/partial/var';
</style>
