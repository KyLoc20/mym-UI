<template>
  <section class="catalog">
    <RecursiveItem
      v-for="(item, idx) in items"
      :key="idx"
      :content="item.content"
      :children="item.children"
      :selectedOne="selectedLabel"
      :layer="1"
      :layerNum="layer"
      :tabSize="indent"
      @select="handleSelect({ label: '$root', layer: 0 }, $event)"
    ></RecursiveItem>
  </section>
</template>
<script>
import RecursiveItem from "./RecursiveItem";
export default {
  name: "Catalog",
  components: { RecursiveItem },
  props: {
    layer:{
      //number of layers
      //todo automatically calc
      type: Number,
    },
    indent:{
      //for RecursiveItem
      type: Number,
      default:24
    },
    //[content:Object,children?:[item]]
    items: {
      type: Array,
    },
    selectedOne:{
      type:String,
      required:false,
    }
  },
  data() {
    return {
      selectedLabel: this.selectedOne,
    };
  },
  methods: {
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
.catalog {
  display: flex;
  flex-direction: column;
  padding:16px 8px;
}
</style>
