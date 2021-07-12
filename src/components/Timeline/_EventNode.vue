<template>
  <section class="event-node" :class="classes" :style="{}">
    <div class="description left" :style="{ color: computedTextColor }">
      {{ descriptionLeft }}
    </div>
    <div class="axis">
      <div
        class="dot"
        :style="{ background: computedDotColor, border: computedBorder }"
      ></div>
      <div
        class="bar"
        :style="{ background: computedBarColor }"
        v-if="!last"
      ></div>
    </div>
    <div class="description right" :style="{ color: computedTextColor }">
      {{ descriptionRight }}
    </div>
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
      type: Boolean, //the last one has no [bar]
    },
    dotColor: {
      type: String,
      required: false,
    },
    textColor: {
      type: String,
      required: false,
    },
    barColor: {
      type: String,
      required: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [];
    },
    computedBorder() {
      return this.outlined ? `2px solid ${this.dotColor || "rgba(189, 189, 189, 1)"}` : null;
    },
    computedDotColor() {
      return this.outlined
        ? "transparent"
        : this.dotColor || "rgba(189, 189, 189, 1)";
    },
    computedBarColor() {
      return this.barColor || "rgba(189, 189, 189, 1)";
    },
    computedTextColor() {
      return this.textColor || "rgba(0, 0, 0, 0.87)";
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
      box-sizing: border-box;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 11.5px 0;
    }
    .bar {
      width: 2px;
      height: calc(100% - 35px);
    }
  }
  .description {
    display: flex;
    flex: 1;
    box-sizing: border-box;
    min-height: 70px;
    line-height: 24px;
    padding: 6px 16px;
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
