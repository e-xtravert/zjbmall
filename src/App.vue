<template>
  <div id="app">
    <home></home>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabBar/MainTabBar";
import Home from "./views/home/Home";

export default {
  name: 'App',
  components: {
    Home,
    MainTabBar,
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
