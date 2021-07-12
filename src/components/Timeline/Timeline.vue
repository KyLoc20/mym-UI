<template>
  <section class="timeline" :class="classes" :style="{}">
    123
  </section>
</template>
<script>
// import { requireOneOf, requirePositiveNumber } from "../common/validator";
export default {
  name: "Timeline",
  components: {},
  props: {
    events: {
      type: Array,
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
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.timeline {
  position: relative;
  display: flex;
}
</style>
