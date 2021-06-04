<template>
  <section class="quote"><slot></slot></section>
</template>
<script>
export default {
  name: "Span",
  components: {},
};
</script>
<style lang="less" scoped>
.quote {
  margin: 24px 0;
  padding: 4px 24px;
  border-left: 5px solid #ffe564;
  background-color: rgba(255, 229, 100, 0.2);
  p {
    margin-top: 16px;
  }
}
</style>
