<template>
  <span class="icon c-icon" :style="wrapStyle"></span>
</template>
<script>
const cache = new Map()
export default {
  props: {
    src: { type: String, required: true },
    width: { type: String, default: '1.2em' },
    height: { type: String, default: '1.2em' }
  },
  computed: {
    wrapStyle() {
      return {
        color: 'black',
        height: this.height,
        width: this.width
      }
    }
  },
  async mounted() {
    if (!cache.has(this.src)) {
      try {
        cache.set(this.src, fetch(this.src).then(r => r.text()))
      } catch (e) {
        cache.delete(this.src)
      }
    }
    if (cache.has(this.src)) {
      this.$el.innerHTML = await cache.get(this.src)
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../stylesheet/partial/var';
@import '../stylesheet/partial/placeholder';
@import '../stylesheet/partial/mixin';
.icon {
  display: inline-block;
  @include square(2em);
}
</style>
