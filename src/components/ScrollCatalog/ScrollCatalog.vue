<template>
  <section class="scroll-catalog">
    <section class="title">contents</section>
    <ul class="item-container">
      <li class="item">image</li>
      <li class="item">letter</li>
      <li class="item">size</li>
      <li class="item">icon</li>
      <li class="item">API</li>
    </ul>
  </section>
</template>
<script>
export default {
  name: "ScrollCatalog",
  components: {},
  props: {
    //[content:Object,children?:[item]]
    items: {
      type: Array,
    },
    selectedOne: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      selectedLabel: this.selectedOne,
    };
  },
  mounted() {
    console.log(this.items);
  },
  methods: {
    locateByScrolling() {},
    handleSelect(current, where) {
      let label = current.label;
      let layer = current.layer;
      this.selectedLabel = where.label;
      console.log(
        "Here is: ",
        label,
        layer,
        " handleSelect from: ",
        where,
        " current selectedLabel: ",
        this.selectedLabel
      );
      //report to the upper cpt to go somewhere
      this.$emit("select", where);
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
  .item-container{
    margin:0;
    padding:0;
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
  }
}
</style>
