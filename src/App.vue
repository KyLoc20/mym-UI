<template>
  <div id="app" :style="pageWidth">
    <section class="header">
      <app-bar :itemsDrawer="drawerItems"></app-bar>
    </section>
    <section class="main-container">
      <router-view></router-view>
      <section class="footer">
        <divider></divider>
      </section>
    </section>
  </div>
</template>

<script>
import AppBar from "./components/AppBar/AppBar";
import Divider from "./components/Divider/Divider";
export default {
  name: "App",
  components: { AppBar, Divider },
  data() {
    return {
      scrollerWidth: null,
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
  mounted() {
    //it varies from browser types
    let scrollerWidth = window.innerWidth - document.body.clientWidth;
    this.scrollerWidth = scrollerWidth;
  },
  computed: {
    pageWidth() {
      return { width: `calc(100vw - ${this.scrollerWidth}px)` };
    },
  },
};
</script>

<style scoped lang="less">
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  display: flex;
  justify-content: flex-start;
  //todo calculate scroller width
  // margin-right: calc(100% - 100vw); // way1 to not changing scroller show and hide
  //width: calc(100vw - 17px); // way2 to not changing scroller show and hide
  .main-container {
    width: 100%;
    max-width: 960px;
    padding-top: 96px; //for header
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 16px;
    .footer{
      margin: 96px 0 30px;
    }
  }
  @media (min-width: 600px) {
    .main-container {
      width: calc(100% - 175px); //for right navigation
      padding-left: 24px;
      padding-right: 24px; // add scroller width
    }
  }
}
</style>
