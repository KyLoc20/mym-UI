<template>
  <div id="app">
    <section class="header">
      <app-bar :itemsDrawer="drawerItems"></app-bar>
    </section>
    <section class="navigation"></section>
    <section class="main-container">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import AppBar from "./components/AppBar/AppBar";
export default {
  name: "App",
  components: { AppBar },
  data() {
    return {
      drawerItems: [
        {
          label: "inputs",
          text: "Inputs", 
          children: [
            { label: "button", text: "Button" },
            { label: "checkbox", text: "Checkbox" },
            { label: "radio", text: "Radio" },
            { label: "select", text: "Select" },
            { label: "slider", text: "Slider" },
            { label: "textfield", text: "Text Field" },
          ],
        },
        {
          label: "navigation",
          text: "Navigation",
          children: [
            { label: "bottom-navigation", text: "Bottom Navigation" },
            { label: "breadcrumbs", text: "Breadcrumbs" },
            { label: "drawer", text: "Drawer" },
            { label: "menu", text: "Menu" },
            { label: "stepper", text: "Stepper" },
            { label: "tabs", text: "Tabs" },
          ],
        },
        {
          label: "surfaces",
          text: "Surfaces",
          children: [
            { label: "app-bar", text: "App Bar" },
            { label: "card", text: "Card" },
          ],
        },
        {
          label: "feedback",
          text: "Feedback",
          children: [
            { label: "progress", text: "Progress" },
            { label: "snackbar", text: "Snackbar" },
          ],
        },
        {
          label: "data-display",
          text: "Data Display",
          children: [
            { label: "avatar", text: "Avatar" },
            { label: "badge", text: "Badge" },
            { label: "chip", text: "Chip" },
          ],
        },
      ],
    };
  },
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
