<template>
  <section
    class="unit"
    :class="classes"
    :style="{}"
    @mouseenter="handleHoverEnter"
    @mouseleave="handleHoverLeave"
  >
    <Icon
      class="base-icon"
      :name="icon"
      :size="size"
      :color="computedColor"
      :style="{ transform: computedScale }"
    ></Icon>
    <Icon
      class="active-icon"
      v-show="shouldDisplayActiveIcon"
      :name="activeIcon"
      :size="size"
      :color="computedColor"
      :style="{ transform: computedScale }"
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
    value: {
      //currently value by user
      type: Number,
    },
    color: {
      type: String,
    },
    activeColor: {
      //hovering or selected
      type: String,
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
    isActive(){
      return this.value>=this.rating
    },
    shouldDisplayActiveIcon(){
      if(this.isActive)return true
      return false
    },
    computedColor() {
      if(this.isActive)return this.activeColor||"rgba(250, 175, 0,1)"
      return this.color||"rgba(0, 0, 0, 0.26)";
    },
    computedScale() {
      if (this.isHovering) return "scale(1.2)";
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
  },
};
</script>
<style lang="less" scoped>
.unit {
  display: flex;
  position: relative;
  cursor: pointer;
  width:24px;
  height:24px;
  .icon {
    position: absolute;
    left:0;
    top:0;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
}
</style>
