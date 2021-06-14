<template>
  <section
    class="group-box"
    :style="{
      flexDirection: computedFlexPosition,
      justifyContent: computedJustifyContent,
      alignItems: computedAlignItems,
    }"
  >
    <slot></slot>
  </section>
</template>
<script>
import Flex from "../../mixins/flex"
export default {
  name: "GroupBox",
  mixins:[Flex],
  props: {
    block: {
      //to place elements vertically in rows
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [this.block ? "block" : "inline"];
    },
    computedFlexPosition() {
      return this.block ? "column" : "row";
    },
  },
};
</script>
<style lang="less" scoped>
.group-box {
  display: flex;
  position: relative;
  padding: 24px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12); //.bd-1
  border-radius: 4px; //.br-4
  & > *,
  & > button {
    margin: 8px; //todo Not Sure: can not select button correctly
  } //.margin-8
  p {
    margin: 8px 0;
  }
}
</style>
