<template>
  <div id="app">
    <section class="header">
      <app-bar></app-bar>
    </section>
    <section class="navigation"></section>
    <section class="main-container">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import AppBar from './components/AppBar/AppBar'
export default {
  name: "App",
  components: {AppBar},
};
</script>

<style>
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
