<template>
  <section :class="classes" @mousedown="handleSwitch">
    <div
      class="switch-wrapper"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
    >
      <div
        class="thumb-wrapper"
        :style="{
          background: computedHaloColor,
          transform: computeThumbTransform,
        }"
        @mousedown="handleClickThumb"
      >
        <div class="thumb" :style="{ background: computedThumbColor }"></div>
      </div>
      <div class="track" :style="{ ...computedTrackColor }"></div>
    </div>
    <div class="label-wrapper">
      <span :style="{ color: computedLabelText }">{{ label }}</span>
    </div>
  </section>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
import { requireOneOf } from "../common/validator";
import { getColor } from "./color";
export default {
  name: "VSwitch",
  mixins: [Rippleable],
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rippleDisabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: false,
    },
    size: {
      default: "md",
      validator: (v) => {
        return [requireOneOf(["sm", "md", "lg"])].some((test) => test(v));
      },
    },
    color: {
      required: "primary",
      validator: (v) => {
        return [requireOneOf(["primary", "secondary"])].some((test) => test(v));
      },
    },
  },
  data() {
    return {
      selected: this.checked,
      isHovering: false,
    };
  },
  watch: {
    selected: function(newValue) {
      this.$emit("change", { value: newValue });
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
    handleSwitch() {
      if (this.disabled) return;
      this.selected = !this.selected;
    },
    handleClickThumb(e) {
      //todo create when clicking the switch wrapper
      if (this.disabled) return;
      this.createRipple(e, true, this.computedRippleColor);
    },
  },
  computed: {
    classes() {
      return ["switch", this.disabled ? "disabled" : ""];
    },
    computeThumbTransform() {
      if (this.selected) return "translateX(20px)";
      else return null;
    },
    computedTrackColor() {
      if (this.selected)
        return {
          opacity: this.disabled ? 0.12 : 0.5,
          background: getColor(this.color, "trackCheckd"),
        };
      else
        return {
          opacity: this.disabled ? 0.12 : 0.38,
          background: getColor(this.color, "track"),
        };
    },
    computedThumbColor() {
      if (this.disabled)
        return this.selected
          ? getColor(this.color, "thumbDisabled")
          : getColor("disabled", "thumb");
      if (this.selected) return getColor(this.color, "thumbChecked");
      else return getColor(this.color, "thumb");
    },
    computedHaloColor() {
      if (this.isHovering)
        return this.selected
          ? getColor(this.color, "haloChecked")
          : getColor(this.color, "halo");
      else return "transparent";
    },
    computedRippleColor() {
      if (this.selected) return getColor(this.color, "rippleChecked");
      else return getColor(this.color, "ripple");
    },
    computedLabelText() {
      if (this.disabled) return getColor("disabled", "label");
      else return getColor(this.color, "label");
    },
    classColor() {
      let color = this.color;
      if (this.selected) {
        return color + "-switch";
      } else {
        return "default-switch";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@md-size: 20px;
@default-color: #000;
@primary-color: #1976d2;
@secondary-color: #dc004e;
.switch {
  display: inline-flex;
  cursor: pointer;
  &.disabled {
    cursor: default;
  }
  .switch-wrapper {
    width: 58px;
    height: 38px;
    padding: 12px;
    box-sizing: border-box;
    z-index: 0;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    .track {
      border-radius: 7px;
      width: 100%;
      height: 100%;
    }
    .thumb-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      padding: 9px; //outer-radius
      border-radius: 50%;
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      //ripple z-index: 2;
      .thumb {
        z-index: 3;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.14),
          0px 1px 3px 0px rgba(0, 0, 0, 0.12);
      }
    }
  }
  .label-wrapper {
    display: flex;
    align-items: center;
    span {
      user-select: none;
      font-size: 1rem;
      line-height: 1.5;
      letter-spacing: 0.00938em;
    }
  }
}
</style>
