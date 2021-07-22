<template>
  <pre class="preformatted">
    <code><slot></slot></code>
  </pre>
</template>
<script>
export default {
  name: "Preformatted",
  props: {},
  components: {},
};
</script>
<style lang="less" scoped>
pre {
  display: flex;
  margin: 24px 0;
  padding: 16px;
  overflow: auto;
  border-radius: 4px;
  background-color: #272c34;
  code {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: transparent !important;
    color: #fff;
    font-size: 0.9em;
    line-height: 1.5;
    padding: 0 3px;
  }
}
</style>
