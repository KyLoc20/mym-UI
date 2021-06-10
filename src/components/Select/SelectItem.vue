<template>
  <section
    class="select-item"
    :style="{
      background: computedBackgroundColor,
      color: computedContentColor,
    }"
    @mouseenter="handleHoverEnter"
    @mouseleave="handleHoverLeave"
    @mousedown="handleClick"
  >
    <span class="text">{{ text || label }}</span>
  </section>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
export default {
  name: "SelectItem",
  props: {
    label: {
      type: String,
    },
    text: {
      type: String,
      required: false,
    },
    selected: {
      type: Boolean,
    },
    index: {
      //index of item in the items
      type: Number,
      required: false,
    },
  },
  mixins: [Rippleable],
  data() {
    return {
      isHovering: false,
      isFocused: false,
    };
  },
  computed: {
    computedBackgroundColor() {
      if (this.selected) return "rgba(0, 0, 0, 0.08)";
      else if (this.isHovering) return "rgba(0, 0, 0, 0.04)";
      else return null;
    },
    computedContentColor() {
      return "rgba(0, 0, 0, 0.87)";
    },
  },
  methods: {
    handleHoverEnter() {
      this.isHovering = true;
    },
    handleHoverLeave() {
      this.isHovering = false;
    },
    handleClick(e){
      e.preventDefault()
      //to avoid blur conflict use @mousedown not @click
      this.createRipple(e, false, "default");
      this.$emit("select",{label:this.label,index:this.index})
    }
  },
};
</script>
<style lang="less" scoped>
.select-item {
  display: flex;
  width: 100%;
  height: 36px;
  padding: 6px 16px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;
}
</style>
