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
    <section class="right-container">
      <router-view class="scroll-catalog" name="catalog"></router-view>
      <!-- <scroll-catalog title="contents" :items="scrollItems"></scroll-catalog> -->
    </section>
  </div>
</template>

<script>
import AppBar from "./components/AppBar/AppBar";
import Divider from "./components/Divider/Divider";
// import ScrollCatalog from "./components//ScrollCatalog/ScrollCatalog";
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
            { content: { label: "button", text: "Button", link: "button" } },
            {
              content: {
                label: "checkbox",
                text: "Checkbox",
                link: "checkbox",
              },
            },
            {
              content: {
                label: "float-action-button",
                text: "Float Action Button",
                link: "float-action-button",
              },
            },
            {
              content: {
                label: "radio",
                text: "Radio Button",
                link: "radio-button",
              },
            },
            { content: { label: "select", text: "Select🚧" } },
            { content: { label: "slider", text: "Slider🚧", link: "slider" } },
            { content: { label: "textfield", text: "Text Field🚧" } },
          ],
        },
        {
          content: { label: "navigation", text: "Navigation🚧" },
          children: [
            {
              content: {
                label: "bottom-navigation",
                text: "Bottom Navigation",
              },
            },
            { content: { label: "breadcrumbs", text: "Breadcrumbs🚧" } },
            { content: { label: "drawer", text: "Drawer🚧" } },
            { content: { label: "menu", text: "Menu🚧" } },
            { content: { label: "stepper", text: "Stepper", link: "stepper🚧" } },
            { content: { label: "tabs", text: "Tabs🚧" } },
          ],
        },
        {
          content: { label: "surfaces", text: "Surfaces" },
          children: [
            { content: { label: "app-bar", text: "App Bar🚧" } },
            { content: { label: "card", text: "Card🚧", link: "card" } },
          ],
        },
        {
          content: { label: "feedback", text: "Feedback" },
          children: [
            { content: { label: "progress", text: "Progress🚧" } },
            { content: { label: "snackbar", text: "Snackbar🚧" } },
          ],
        },
        {
          content: { label: "data-display", text: "Data Display" },
          children: [
            { content: { label: "avatar", text: "Avatar", link: "avatar" } },
            { content: { label: "badge", text: "Badge🚧" } },
            { content: { label: "chip", text: "Chip", link: "chip" } },
          ],
        },
      ],
      scrollItems: [
        { anchor: "ac-image", text: "Image avatars" },
        { anchor: "ac-letter", text: "Letter avatars" },
        { anchor: "ac-sizes", text: "Sizes" },
        { anchor: "ac-badge", text: "With badge" },
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
  justify-content: center;
  position: relative;
  // margin-right: calc(100% - 100vw); // way1 to not changing scroller show and hide
  //width: calc(100vw - 17px); // way2 to not changing scroller show and hide
  .main-container {
    width: 100%;
    max-width: 960px;
    padding-top: 96px; //for header
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 16px;
    .footer {
      margin: 96px 0 30px;
    }
  }
  .right-container {
    display: none;
    width: 160px;
    position: sticky;
    height: calc(100vh - 70px);
    top: 0px;
    // margin-top:70px;
    padding: 86px 16px 16px 0;
    box-sizing: border-box;
  }
  @media (min-width: 600px) {
    .main-container {
      width: calc(100% - 175px); //for right navigation
      margin-left: auto;
      margin-right: auto;
      padding-left: 24px;
      padding-right: 24px; // add scroller width
    }
    .right-container {
      display: block;
    }
  }
  @media (min-width: 960px) {
    .main-container {
      max-width: 120ch;
    }
  }

  @media (min-width: 1280px) {
    .main-container {
      padding-left: 48px;
      padding-right: 48px;
    }
  }
}
</style>
