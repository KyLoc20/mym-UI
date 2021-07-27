<template>
  <section
    :class="classes"
    @mousedown="handleSwitch"
    :style="{ ...computedFlexPosition }"
  >
    <div
      class="switch-wrapper"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
      :style="{
        width: computedSwitchWidth,
        height: computedSwitchHeight,
        padding: computedSwitchPadding,
      }"
    >
      <div
        class="thumb-wrapper"
        :style="{
          background: computedHaloColor,
          transform: computeThumbTransform,
          padding: computedThumbHaloRadius,
          top: computedThumbTop,
        }"
        @mousedown="handleClickThumb"
      >
        <div
          class="thumb"
          :style="{
            background: computedThumbColor,
            width: computedThumbSize,
            height: computedThumbSize,
          }"
        ></div>
      </div>
      <div
        class="track"
        :style="{ ...computedTrackColor, borderRadius: computedTrackRadius }"
      ></div>
    </div>
    <div class="label-wrapper">
      <span :style="{ color: computedLabelText }">{{ label }}</span>
    </div>
  </section>
</template>
<script>
const FlexDirectionMap = {
  left: "row-reverse",
  right: "row",
  top: "column-reverse",
  bottom: "column",
};
import Rippleable from "../../mixins/rippleable";
import { requireOneOf } from "../common/validator";
import { getColor } from "./color";
import { getSize } from "./size";
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
    //todo set min-width by label length
    labelNoWrap: {
      type: Boolean,
      default: false,
    },
    size: {
      default: "md",
      validator: (v) => {
        return [requireOneOf(["sm", "md", "lg"])].some((test) => test(v));
      },
    },
    color: {
      default: "primary",
      validator: (v) => {
        return [requireOneOf(["primary", "secondary"])].some((test) => test(v));
      },
    },
    labelPlacement: {
      default: "right",
      validator: (v) => {
        return [requireOneOf(["top", "left", "bottom", "right"])].some((test) =>
          test(v)
        );
      },
    },
    //custom color
    colorOptions: {
      type: Object,
      default: () => {},
    },
    //custom size
    width: {
      //track length
      type: Number,
      required: false,
    },
    height: {
      //track thickness
      type: Number,
      required: false,
    },
    thumbSize: {
      type: Number,
      required: false,
    },
    thumbHaloSize: {
      //thumb wrapper
      type: Number,
      required: false,
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
    getCustomColor(type) {
      return this.colorOptions?.[type];
    },
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
    computedTrackColor() {
      if (this.selected)
        return {
          opacity: this.disabled ? 0.12 : 0.5,
          background:
            this.getCustomColor("trackCheckd") ||
            getColor(this.color, "trackCheckd"),
        };
      else
        return {
          opacity: this.disabled ? 0.12 : 0.38,
          background:
            this.getCustomColor("track") || getColor(this.color, "track"),
        };
    },
    computedThumbColor() {
      if (this.disabled)
        return this.selected
          ? this.getCustomColor("thumbDisabled") ||
              getColor(this.color, "thumbDisabled")
          : getColor("disabled", "thumb");
      if (this.selected)
        return (
          this.getCustomColor("thumbChecked") ||
          getColor(this.color, "thumbChecked")
        );
      else return this.getCustomColor("thumb") || getColor(this.color, "thumb");
    },
    computedHaloColor() {
      if (this.isHovering)
        return this.selected
          ? this.getCustomColor("haloChecked") ||
              getColor(this.color, "haloChecked")
          : this.getCustomColor("halo") || getColor(this.color, "halo");
      else return "transparent";
    },
    computedRippleColor() {
      if (this.selected)
        return (
          this.getCustomColor("rippleChecked") ||
          getColor(this.color, "rippleChecked")
        );
      else
        return this.getCustomColor("ripple") || getColor(this.color, "ripple");
    },
    computedLabelText() {
      if (this.disabled) return getColor("disabled", "label");
      else return this.getCustomColor("label") || getColor(this.color, "label");
    },
    calcSwitchPadding() {
      return this.padding || getSize(this.size, "padding");
    },
    calcTrackWidth() {
      return this.width || getSize(this.size, "width");
    },
    calcTrackHeight() {
      return this.height || getSize(this.size, "height");
    },
    computedSwitchWidth() {
      //padding+trackWidth+padding
      return `${this.calcTrackWidth + 2 * this.calcSwitchPadding}px`;
    },
    computedSwitchHeight() {
      //padding+trackHeight+padding
      return `${this.calcTrackHeight + 2 * this.calcSwitchPadding}px`;
    },
    computedSwitchPadding() {
      return `${this.calcSwitchPadding}px`;
    },
    calcThumbSize() {
      return this.thumbSize || getSize(this.size, "thumb");
    },
    calcThumbHaloSize() {
      return this.thumbHaloSize || getSize(this.size, "halo");
    },
    calcThumbPadding() {
      //padding=(thumbHaloSize- thumbSize)/2
      return (this.calcThumbHaloSize - this.calcThumbSize) / 2;
    },
    computedThumbSize() {
      return `${this.calcThumbSize}px`;
    },
    computedThumbHaloRadius() {
      return `${this.calcThumbPadding}px`;
    },
    calcTrackRadius() {
      return this.calcTrackHeight / 2;
    },
    computedTrackRadius() {
      return `${this.calcTrackRadius}px`;
    },
    //two positions responding to two states
    calcThumbStartPosition() {
      const shouldStartX = this.calcSwitchPadding + this.calcTrackRadius;
      const centerX = this.calcThumbHaloSize / 2;
      return shouldStartX - centerX;
    },
    calcThumbEndPosition() {
      const shouldEndX =
        this.calcSwitchPadding + this.calcTrackWidth - this.calcTrackRadius;
      const centerX = this.calcThumbHaloSize / 2;
      return shouldEndX - centerX;
    },
    computeThumbTransform() {
      if (this.selected) return `translateX(${this.calcThumbEndPosition}px)`;
      else return `translateX(${this.calcThumbStartPosition}px)`;
    },
    calcThumbTop() {
      const shouldY = this.calcSwitchPadding + this.calcTrackRadius;
      const centerY = this.calcThumbHaloSize / 2;
      return shouldY - centerY;
    },
    computedThumbTop() {
      return `${this.calcThumbTop}px`;
    },
    computedFlexPosition() {
      return { flexDirection: FlexDirectionMap[this.labelPlacement] || "row" };
    },
  },
};
</script>
<style lang="less" scoped>
// a,a:link,a:visited,a:hover,a:active{
//     text-decoration: none;
//     color:inherit;
// }

.switch {
  display: inline-flex;
  cursor: pointer;
  &.disabled {
    cursor: default;
  }
  .switch-wrapper {
    box-sizing: border-box;
    z-index: 0;
    position: relative;
    flex-shrink: 0;
    .track {
      width: 100%;
      height: 100%;
    }
    .thumb-wrapper {
      position: absolute;
      left: 0;
      z-index: 1;
      border-radius: 50%;
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      //ripple z-index: 2;
      .thumb {
        z-index: 3;
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
    justify-content: center;
    span {
      user-select: none;
      font-size: 1rem;
      line-height: 1.5;
      letter-spacing: 0.00938em;
    }
  }
}
</style>
