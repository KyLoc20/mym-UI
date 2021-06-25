<template>
  <div id="app" :style="pageWidth">
    <section class="header">
      <AppBar>
        <Drawer
          :style="{...computedDrawerMargin}"
          icon="menu"
          :active="isDrawerActive"
          @ready="handleReadyToOpenDrawer"
        >
          <ProjectMeta version="v0.5.1" title="MyMaterial-UI"></ProjectMeta>
          <divider></divider>
          <catalog
            :items="drawerItems"
            :selectedOne="curSelectedOne"
            :layer="3"
            :indent="6"
            @select="handleSelectFromCatalog"
          ></catalog>
        </Drawer>
      </AppBar>
    </section>
    <section class="main-container">
      <router-view></router-view>
      <section class="footer">
        <divider></divider>
      </section>
    </section>
    <section class="right-container">
      <router-view class="scroll-catalog" name="catalog"></router-view>
    </section>
  </div>
</template>

<script>
import AppBar from "./components/AppBar/AppBar";
import Divider from "./components/Divider/Divider";
import Catalog from "./components/Catalog/Catalog";
import Drawer from "./components/Drawer/CustomDrawer";
import ProjectMeta from "./local/components/ProjectMeta.vue";
const getDrawerItems = () => [
  {
    content: { label: "components", text: "Components" },
    children: [
      {
        content: { label: "inputs", text: "Inputs" },
        children: [
          {
            content: {
              label: "autocomplete",
              text: "Autocomplete⚡",
              link: "autocomplete",
            },
          },
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
          { content: { label: "rating", text: "Rating⚡", link: "rating" } },
          { content: { label: "select", text: "Select", link: "select" } },
          { content: { label: "slider", text: "Slider⚡", link: "slider" } },
          { content: { label: "textfield", text: "Text Field🚧" } },
        ],
      },
      {
        content: { label: "navigation", text: "Navigation" },
        children: [
          {
            content: {
              label: "bottom-navigation",
              text: "Bottom Navigation🚧",
            },
          },
          { content: { label: "breadcrumbs", text: "Breadcrumbs🚧" } },
          { content: { label: "drawer", text: "Drawer🚧" } },
          { content: { label: "menu", text: "Menu🚧" } },
          { content: { label: "stepper", text: "Stepper", link: "stepper" } },
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
  },
  {
    content: { label: "playground", text: "Playground" },
    children: [],
  },
];
export default {
  name: "App",
  components: { AppBar, Divider, Drawer, Catalog, ProjectMeta },
  data() {
    return {
      scrollerWidth: null,
      drawerItems: getDrawerItems(),
      isDrawerActive: true,
      curSelectedOne: null,
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
    computedDrawerMargin() {
      return { marginLeft: "-12px", marginRight: "16px" };
    },
  },
  methods: {
    handleSelectFromCatalog(where) {
      //deal with going somewhere
      console.log("handleSelectFromCatalog", where);
      let link = where.link;
      if (link) {
        this.curSelectedOne = where.label;
        this.goToLink(link);
        //control to close the drawer
        this.closeDrawer();
      }
    },
    handleReadyToOpenDrawer() {
      this.isDrawerActive = true;
      //when the drawer is open
      //todo not recommended
      document.documentElement.style.overflow = "hidden";
    },
    closeDrawer() {
      this.isDrawerActive = false;
      //when the drawer is close
      //todo not auto for position:sticky
      document.documentElement.style.overflow = "visible";
    },
    goToLink(link) {
      if (link) {
        console.log("------>goToLink: ", this.$route.params, this.$route);
        //todo check valid link
        this.$router.push("/" + link);
      }
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
