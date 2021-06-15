<template>
  <section class="mark" :class="classes" :style="{ ...computedPosition,background:computedColor }"></section>
</template>
<script>
export default {
  name: "Mark",
  components: {},
  props: {
    index: {
      type: Number,
    },
    //a percentage number to decide its position
    position: {
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
        ? { bottom: `${this.position * 100}%`, left: "50%" }
        : { left: `${this.position * 100}%`, top: "50%"};
    },
    computedColor() {
      if (this.ranged) return "rgba(255,255,255,1)";
      else return this.color;
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
}
</style>
