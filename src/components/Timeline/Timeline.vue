<template>
  <section class="timeline" :class="classes" :style="{}">
    <div
      class="event-wrapper"
      v-for="(event, idx) in computedEvents"
      :key="idx"
    >
      <EventNode
        :descriptionLeft="event.left"
        :descriptionRight="event.right"
        :last="idx === computedEventNum - 1"
      ></EventNode>
    </div>
  </section>
</template>
<script>
// import { requireOneOf, requirePositiveNumber } from "../common/validator";
import EventNode from "./_EventNode.vue";
export default {
  name: "Timeline",
  components: { EventNode },
  props: {
    events: {
      type: Array, //"Eat" or {left: "10:00 am", right: "Eat",}
    },
    alternating: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    color: {
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
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [];
    },
    computedEventNum() {
      return this.events.length;
    },
    computedEvents() {
      if (!this.events) return [];
      return this.events.map((item) => {
        if (typeof item === "string") return { right: item };
        else if (typeof item === "object")
          return { right: item.right, left: item.left };
        else return { right: undefined };
      });
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  .event-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
