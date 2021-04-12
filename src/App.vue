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
          content: { label: "inputs", text: "Inputs" },
          children: [
            { content: { label: "button", text: "Button" } },
            { content: { label: "checkbox", text: "Checkbox" } },
            { content: { label: "radio", text: "Radio" } },
            { content: { label: "select", text: "Select" } },
            { content: { label: "slider", text: "Slider" } },
            { content: { label: "textfield", text: "Text Field" } },
          ],
        },
        {
          content: { label: "navigation", text: "Navigation" },
          children: [
            {
              content: {
                label: "bottom-navigation",
                text: "Bottom Navigation",
              },
            },
            { content: { label: "breadcrumbs", text: "Breadcrumbs" } },
            { content: { label: "drawer", text: "Drawer" } },
            { content: { label: "menu", text: "Menu" } },
            { content: { label: "stepper", text: "Stepper" } },
            { content: { label: "tabs", text: "Tabs" } },
          ],
        },
        {
          content: { label: "surfaces", text: "Surfaces" },
          children: [
            { content: { label: "app-bar", text: "App Bar" } },
            { content: { label: "card", text: "Card" } },
          ],
        },
        {
          content: { label: "feedback", text: "Feedback" },
          children: [
            { content: { label: "progress", text: "Progress" } },
            { content: { label: "snackbar", text: "Snackbar" } },
          ],
        },
        {
          content: { label: "data-display", text: "Data Display" },
          children: [
            { content: { label: "badge", text: "Badge" } },
            { content: { label: "chip", text: "Chip" } },
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
