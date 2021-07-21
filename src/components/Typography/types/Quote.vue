<template>
  <section class="quote">
    <p>
      <strong>{{ reminder }}</strong
      ><slot></slot>
    </p>
  </section>
</template>
<script>
export default {
  name: "Quote",
  props: {
    reminder: {
      type: String,
      default: "Note: ",
    },
  },
  components: {},
};
</script>
<style lang="less" scoped>
.quote {
  margin: 24px 0;
  padding: 4px 16px;
  border-left: 5px solid #ffe564;
  background-color: rgba(255, 229, 100, 0.2);
  p {
    margin: 16px 0;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: rgba(0, 0, 0, 0.87);
    word-break: break-word;
  }
}
</style>
