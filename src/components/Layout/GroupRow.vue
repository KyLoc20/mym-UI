<template>
  <section
    class="group-row"
    :style="{
      justifyContent: computedJustifyContent,
      alignItems: computedAlignItems,
    }"
  >
    <slot></slot>
  </section>
</template>
<script>
import Flex from "../../mixins/flex";
export default {
  name: "GroupRow",
  mixins: [Flex],
  props: {},
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.group-row {
  display: flex;
  flex-direction: row;
  & > *,
  & > button {
    margin: 8px;
  } //.margin-8
}
</style>
