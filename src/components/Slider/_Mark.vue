<template>
  <section
    class="mark"
    :class="classes"
    :style="{ ...computedPosition, background: computedColor }"
  >
    <span class="label" :style="{ ...computedLabelPosition }">{{ label }}</span>
  </section>
</template>
<script>
export default {
  name: "Mark",
  components: {},
  props: {
    index: {
      type: Number,
    },
    //a percentage number to decide its position in the slider
    progress: {
      type: Number,
    },
    color: {
      //color when unranged
      type: String,
    },
    //whether ranged in the slider
    ranged: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: false,
    },
    labelOffset: {
      //distance to the rail
      type: Number,
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [this.ranged ? "ranged" : ""];
    },
    computedPosition() {
      return this.vertical
        ? { bottom: `${this.progress * 100}%`, left: "50%" }
        : { left: `${this.progress * 100}%`, top: "50%" };
    },
    computedColor() {
      if (this.ranged) return "rgba(255,255,255,1)";
      else return this.color;
    },
    computedLabelPosition() {
      if (this.vertical)
        return { left: `${this.labelOffset}px`, transform: "translateY(-50%)" };
      else
        return { top: `${this.labelOffset}px`, transform: "translateX(-50%)" };
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.mark {
  position: absolute;
  width: 2px;
  height: 2px;
  .label {
    position: absolute;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.01em;
    color: rgba(0, 0, 0, 0.87);
    white-space: nowrap;
  }
}
</style>
