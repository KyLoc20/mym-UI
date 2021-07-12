<template>
  <section class="event-node" :class="classes" :style="{}">
    <div class="description left">{{ descriptionLeft }}</div>
    <div class="axis">
      <div class="dot"></div>
      <div class="bar" v-if="!last"></div>
    </div>
    <div class="description right">{{ descriptionRight }}</div>
  </section>
</template>
<script>
export default {
  name: "EventNode",
  components: {},
  props: {
    descriptionLeft: {
      type: String,
    },
    descriptionRight: {
      type: String,
    },
    last: {
      type: Boolean,//the last one has no [bar]
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [];
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.event-node {
  position: relative;
  display: flex;
  width: 100%;
  .axis {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12px;
    min-height: 70px;
    .dot {
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 11.5px 0;
      background: rgba(189, 189, 189, 1);
    }
    .bar {
      width: 2px;
      height: calc(100% - 35px);
      background: rgba(189, 189, 189, 1);
    }
  }
  .description {
    display: flex;
    flex: 1;
    box-sizing: border-box;
    min-height: 70px;
    line-height: 24px;
    padding: 6px 16px;
    color: rgba(0, 0, 0, 0.87);
    font-size: 16px;
    &.left {
      justify-content: flex-end;
      text-align: right;
    }
    &.right {
      text-align: left;
    }
  }
}
</style>
