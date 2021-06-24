<template>
  <section class="project-meta">
    <section class="title">MyMaterial-UI</section>
    <section class="version">v0.5.0</section>
  </section>
</template>
<script>
export default {
  name: "ProjectMeta",
  props: {
    title: {
      type: String,
    },
    version: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.project-meta {
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 64px;
  padding: 0 0 0 24px;
  margin-top: -8px;
  .title {
    font-size: 20px;
    max-height: 32px;
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 6);
    letter-spacing: 0.0075em;
    cursor: pointer;
    transition: color 200ms cubic-bezier(0.4, 0.2, 0, 1);
    &:hover {
      text-decoration: underline;
      color: #1976d2;
    }
  }
  .version {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.54);
    letter-spacing: 0.03333em;
    line-height: 20px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
