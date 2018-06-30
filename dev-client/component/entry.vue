<template>
  <div class="app-container">
    <div class="main-content-container c-container c-pad">
      <transition :name="transitionName">
        <template v-if="$route.matched.length">
        	<router-view></router-view>
        </template>
        <template v-else>
        </template>
      </transition>
    </div>
  </div>
</template>

<script>
import NavMenu from './navMenu'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  components: { NavMenu },
  data() {
    return {
      loggedIn: false,
      transitionName: 'fade'
    }
  },
  watch: {
    $route(to, from) {}
  },
  computed: {
    ...mapState(['userName'])
  },
  methods: {
    ...mapActions(['getUserInfo']),
    ...mapMutations(['SET_USER_INFO'])
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    const sharedData = JSON.parse(window.sharedData || '{}')
    this.SET_USER_INFO({
      userName: sharedData.username
    })
  }
}
</script>

<style lang='scss' scoped>
@import '../stylesheet/partial/var';
.app-container {
  /*display: flex;*/
  display: grid;
  /*min-height: 100vh; */
  grid:
    'filter filter' 2.5em
    'main main' auto
    'footer .' 1.5em
    / auto auto;
  grid-gap: 0;
}
.filters {
  grid-area: filter;
}
.main-content-container {
  grid-area: main;
  background-color: $white;
  position: relative;
  height: auto;
  /*flex-basis: calc(100% - 160px);*/
}
.footer {
  grid-area: footer;
}
</style>
