<template>
  <div class="nav-wrap">
    <icon name="hamburger" span-class="open-menu" :click-fn="openNav"></icon>
    <slide :show-slide="showNav" :mask-click-fn="hideNav" align="left">
      <div class="nav-items-wrap">
        <div :class="['nav', 'c-center', 'c-link', el.path === currentNav ? 'current-nav' : '']"
          v-for="(el, idx) in routePath"
          :key="idx"
          @click="navChange(el)">{{ el.label }}</div>
      </div>
    </slide>
  </div>
</template>
<script>
  import routePath from '../javascript/common/routePath'
  import { mapState } from 'vuex'
  import Icon from './icon'
  import Slide from './slide'
  export default {
    components: { Icon, Slide },
    data () {
      return {
        routePath,
        showNav: false
      }
    },
    computed: {
      ...mapState([
        'currentNav'
      ])
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      navChange(el) {
        this.$router.push(el.path == null ? `/${el.component}` : el.path)
        this.hideNav()
      },
      openNav() {
        this.showNav = true
      },
      hideNav() {
        this.showNav = false
      }
    }
  }
</script>
<style lang='scss' scoped>
  @import '../stylesheet/partial/var';
  @import '../stylesheet/partial/placeholder';
  @import '../stylesheet/partial/mixin';
  .nav-items-wrap {
    position: relative;
    background-color: $white;
    height: 100%;
  }
  .open-menu {
    @include square(1.2em);
  }
  .nav {
    color: $black;
    &:hover,
    &.current-nav {
      background-color: $aqua;
    }
  }
</style>
