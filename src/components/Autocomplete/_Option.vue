<template>
  <section
    class="option"
    :class="classes"
    @mouseenter="handleHoverEnter"
    @mouseleave="handleHoverLeave"
    @mousedown="handleSelect"
    :style="{ background: computedColor }"
  >
    <span class="text" :style="{ color: computedTextColor }">
      {{ label }}
    </span>
  </section>
</template>
<script>
export default {
  name: "Option",
  components: {},
  props: {
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      //currently selected
      type: Boolean,
      default: false,
    },
    touched: {
      //wanna select by keyboard
      type: Boolean,
      default: false,
    },
    hoverColor: {
      type: String,
      required: false,
    },
    textColor: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isHovering: false,
    };
  },
  computed: {
    classes() {
      return [this.disabled ? "disabled" : ""];
    },
    computedTextColor() {
      if (this.disabled) return "rgba(0, 0, 0, 0.38)";
      else return this.textColor || null;
    },
    computedColor() {
      if (this.selected) return "rgba(25, 118, 210, 0.08)";
      else if (this.isHovering || this.touched) return "rgba(0, 0, 0, 0.04)";
      else return null;
    },
  },
  methods: {
    handleHoverEnter() {
      if (this.disabled) return;
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (this.disabled) return;
      this.isHovering = false;
    },
    handleSelect(e) {
      e.preventDefault(); //avoid to blur
      if (this.disabled) return;
      console.log("handleSelect", this.label);
      this.$emit("select", { label: this.label });
    },
  },
};
</script>
<style lang="less" scoped>
.option {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 6px 16px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 10;
  &.disabled {
    cursor: default;
  }
  .text {
    line-height: 24px;
    font-size: 16px;
    user-select: none;
    word-break: break-all;
  }
}
</style>
