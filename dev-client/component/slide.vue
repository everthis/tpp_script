<template>
  <transition name="sop">
    <div class="c-slide-wrap" v-show="showSlide">
      <div class="c-slide-mask"
      @click="closeSlide"></div>
      <transition :name="slideTranslateName">
        <div v-if="showSlide" class="c-slide-content" :style="contentAlign">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      showSlide: {
        type: Boolean,
        default: false
      },
      maskClickFn: {
        type: Function,
        default: function placeHolderFn() {}
      },
      align: {
        type: String,
        default: 'right'
      },
      endMarginSpace: {
        type: String,
        default: '4em'
      }
    },
    data () {
      return {
      }
    },
    computed: {
      contentAlign: function() {
        const styles = {}
        if (this.align === 'right') {
          styles.right = 0
          styles.marginLeft = this.endMarginSpace
        } else {
          styles.left = 0
          styles.marginRight = this.endMarginSpace
        }
        styles.maxWidth = `calc(100vw - ${this.endMarginSpace})`
        return styles
      },
      slideTranslateName: function() {
        return this.align === 'right' ? 'str-right' : 'str-left'
      }
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      closeSlide() {
        this.maskClickFn()
      }
    }
  }
</script>
<style lang='scss' scoped>
  @import '../stylesheet/partial/var';
  @import '../stylesheet/partial/placeholder';
  @import '../stylesheet/partial/c';
  $delay: 50ms;
  $timing-fn: cubic-bezier(0, 0, .25, 1);
  $duration: .3s;
  .c-slide-wrap {
    position: relative;
    z-index: 9;
  }
  .c-slide-mask {
    @extend .c-mask;
  }
  .c-slide-content {
    position: fixed;
    top: 0;
    bottom: 0;
    height: 100vh;
    background-color: $white;
    transform: translate3d(0, 0, 0);
    will-change: transform;
    box-shadow: 0 0 40px rgba(0, 0, 0, .3);
  }
  .sop-enter-active,
  .sop-leave-active {
    transition: opacity $duration $delay;
  }
  .sop-enter,
  .sop-leave-to {
    opacity: 0;
  }
  .sop-enter-to,
  .sop-leave {
    opacity: 1;
  }
  .str-right-enter-active,
  .str-right-leave-active {
    transition: transform $duration $timing-fn $delay;
  }
  .str-right-enter,
  .str-right-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .str-left-enter-active,
  .str-left-leave-active {
    @extend .str-right-enter-active;
  }
  .str-left-enter,
  .str-left-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
</style>
