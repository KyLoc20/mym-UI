<template>
  <section class="unit" :class="classes" :style="{}" @click="handleClick">
    <Icon
      :name="computedDisplayIcon"
      :size="size"
      :color="computedColor"
      :style="{ transform: computedScale, opacity: computedOpacity }"
    ></Icon>
  </section>
</template>
<script>
import Icon from "../Icon/Icon.vue";
export default {
  name: "Unit",
  components: { Icon },
  props: {
    icon: {
      //inactive: unselected
      type: String,
      default: "star",
    },
    activeIcon: {
      //hovering or selected
      type: String,
      default: "starFill",
    },
    size: {
      type: Number,
      default: 24,
    },
    rating: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    scaled: {
      type: Boolean,
      default: false,
    },
    colored: {
      type: Boolean,
      default: false,
    },
    defaultColor: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [this.disabled ? "disabled" : "", this.readonly ? "readonly" : ""];
    },
    isActive() {
      return this.colored;
    },
    computedDisplayIcon(){
      if(this.isActive)return this.activeIcon
      else return this.icon
    },
    computedColor() {
      if (this.colored) return this.color || "rgba(250, 175, 0,1)";
      else return this.defaultColor || "rgba(0, 0, 0, 0.26)";
    },
    computedOpacity() {
      if (this.disabled) return 0.38;
      else return null;
    },
    computedScale() {
      if (this.scaled) return "scale(1.2)";
      else return null;
    },
  },
  methods: {
    handleClick() {
      if (this.disabled || this.readonly) return;
      this.$emit("select", { value: this.rating });
    },
  },
};
</script>
<style lang="less" scoped>
.unit {
  display: flex;
  position: relative;
  cursor: pointer;
  &.disabled,
  &.readonly {
    cursor: default;
  }
  width: 24px;
  height: 24px;
  .icon {
    position: absolute;
    left: 0;
    top: 0;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
}
</style>
