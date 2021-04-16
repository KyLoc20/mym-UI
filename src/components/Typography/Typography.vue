<template>
  <section class="typography">
    <component :is="componentType">{{ content }}</component>
  </section>
</template>
<script>
const mapType = {};
export default {
  name: "Typography",
  components: {},
  props: {
    variant: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  computed: {
    componentType() {
      return mapType[this.variant];
    },
  },
};
</script>
<style lang="less" scoped>
.description {
  font-size: 1.5rem;
  margin: 0 0 40px;
}
</style>
