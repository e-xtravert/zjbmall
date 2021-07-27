<template>
  <div id="app">
    <main-tab-bar v-if="this.$route.meta.showTab"></main-tab-bar>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabBar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>

@import "./assets/css/base.css";
#app {
  position: relative;
}
</style>
