<template>
  <section
    class="unit"
    :class="classes"
    :style="{ transform: computedScale,width: computedSize, height: computedSize,opacity: computedOpacity, }"
  >
    <Icon
      class="main"
      :name="activeIcon"
      :size="size"
      :color="computedColor"
      :style="{
        ...computedDisplayArea,
        zIndex: 10,
      }"
    ></Icon>
    <Icon
      class="base"
      :name="icon"
      :size="size"
      :color="'rgba(0, 0, 0, 0.26)'"
    ></Icon>
    <span class="dev" v-if="false">{{ colorRange }}</span>
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
    colorRange: {
      //the width percentage of colored area for precision [0,1]
      //when 0 means its not colored
      //when 1 means its fully colored
      type: Number,
      default: 0,
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
      return this.colorRange > 0;
    },
    computedDisplayArea() {
      return { width: `${this.colorRange * 100}%` };
    },
    computedColor() {
      if (this.isActive) return this.color || "rgba(250, 175, 0,1)";
      else return this.defaultColor || "rgba(0, 0, 0, 0.26)";
    },
    computedBaseColor() {
      if (this.isActive) return this.color || "rgba(250, 175, 0,1)";
      else return this.defaultColor || "rgba(0, 0, 0, 0.26)";
    },
    computedOpacity() {
      //todo IMPORTANT it should be applied to the whole cpt instead of both icons separately
      if (this.disabled) return 0.38;
      else return null;
    },
    computedScale() {
      if (this.scaled) return "scale(1.2)";
      else return null;
    },
    computedSize() {
      return `${this.size}px`;
    },
  },
  methods: {},
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
  .icon {
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    // transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  .dev {
    position: absolute;
    top: 150%;
  }
}
</style>
