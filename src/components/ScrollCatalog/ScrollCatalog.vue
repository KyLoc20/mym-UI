<template>
  <section class="scroll-catalog">
    <section class="title">{{ title }}</section>
    <ul class="item-container">
      <router-link
        tag="li"
        class="item"
        active-class="active"
        :to="{ path: '/avatar', hash: item.anchor }"
        v-for="(item, idx) in items"
        :key="idx"
        >{{ item.text }}</router-link
      >
    </ul>
  </section>
</template>
<script>
export default {
  name: "ScrollCatalog",
  components: {},
  props: {
    title: {
      type: String,
    },
    //[anchor:hrefString,text:string]
    items: {
      type: Array,
    },
  },
  data() {
    return {
      selectedLabel: this.selectedOne,
    };
  },
  mounted() {
    console.log(this.items);
    document.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    locateByScrolling() {},
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log("handleScroll", scrollTop);
    },
  },
};
</script>
<style lang="less" scoped>
.scroll-catalog {
  display: flex;
  flex-direction: column;
  .title {
    margin-top: 16px;
    padding-left: 8px;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    margin-bottom: 0.35em;
    text-transform: capitalize;
  }
  .item-container {
    margin: 0;
    padding: 0;
  }
  .item {
    flex: 1;
    text-transform: capitalize;
    padding: 4px 0px 4px 5px;
    font-size: 0.8125rem;
    line-height: 20px;
    box-sizing: border-box;
    border-left: 3px solid transparent;
    margin: 0;
    color: rgba(0, 0, 0, 0.6);
    list-style: none;
    cursor:pointer;
    user-select: none;
    transition:border 100ms cubic-bezier(.4,0,.2,1);
    &:hover{
      border-color: #eeeeee;
    }
    &.active{
      border-color: #e0e0e0;
      color: rgba(0, 0, 0, 0.87);
    }
    a {
      text-decoration: none;
    }
  }
}
</style>
