<template>
  <button
    :class="classes"
    :style="{
      ...computedSize,
      background: computedBackgroundColor,
      border: computedBorder,
      color: computedContentColor,
      boxShadow: computedBoxShadow,
    }"
    @click="handleButtonClick"
    @mouseenter="handleHoverEnter"
    @mouseleave="handleHoverLeave"
  >
    <div class="content">
      <span class="icon-placeholder start" v-if="startIcon">
        <LoadingEffect v-if="loading"></LoadingEffect>
        <Icon v-else :name="startIcon" :size="'sm'" class="start-icon"></Icon>
      </span>
      <span class="text-placeholder">
        <transition>
          <LoadingEffect
            v-if="loading && !startIcon && !endIcon"
            :indicator="loadingIndicator"
          ></LoadingEffect>
        </transition>
        <span
          class="text"
          :class="loading && !startIcon && !endIcon ? 'loading' : ''"
          ><slot></slot
        ></span>
      </span>
      <span class="icon-placeholder end" v-if="endIcon">
        <LoadingEffect v-if="loading"></LoadingEffect>
        <Icon v-else :name="endIcon" :size="'sm'" class="end-icon"></Icon>
      </span>
    </div>
  </button>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
import Icon from "../../components/Icon/Icon";
import LoadingEffect from "./LoadingEffect";
import { requireOneOf, requireAuto } from "../common/validator";
const ColorThemeMap = {
  primary: {
    contained: {
      main: [25, 118, 210, 1],
      focus: [17, 82, 147, 1], //on hover or select
      text: [255, 255, 255, 1], //including text, icon
      ripple: [255, 255, 255, 0.3],
    },
    text: {
      main: [0, 0, 0, 0],
      focus: [25, 118, 210, 0.04], //on hover or select
      text: [25, 118, 210, 0.8],
      ripple: [25, 118, 210, 0.3],
    },
    outlined: {
      main: [0, 0, 0, 0],
      focus: [25, 118, 210, 0.04], //on hover or select
      text: [25, 118, 210, 0.8],
      border: [25, 118, 210, 0.5],
      borderFocused: [25, 118, 210, 1],
      ripple: [25, 118, 210, 0.3],
    },
  },
  secondary: {
    contained: {
      main: [220, 0, 78, 1],
      focus: [154, 0, 54, 1], //on hover or select
      text: [255, 255, 255, 1], //including text, icon
      ripple: [255, 255, 255, 0.3],
    },
    text: {
      main: [0, 0, 0, 0],
      focus: [220, 0, 78, 0.04], //on hover or select
      text: [220, 0, 78, 0.8],
      ripple: [220, 0, 78, 0.3],
    },
    outlined: {
      main: [0, 0, 0, 0],
      focus: [220, 0, 78, 0.04], //on hover or select
      text: [220, 0, 78, 0.8],
      border: [220, 0, 78, 0.5],
      borderFocused: [220, 0, 78, 1],
      ripple: [220, 0, 78, 0.3],
    },
  },
  default: {
    contained: {
      main: [224, 224, 224, 1],
      focus: [213, 213, 213, 1], //on hover or select
      text: [0, 0, 0, 0.87], //including text, icon
      ripple: [0, 0, 0, 0.3],
    },
    text: {
      main: [0, 0, 0, 0],
      focus: [0, 0, 0, 0.04], //on hover or select
      text: [0, 0, 0, 0.87],
      ripple: [0, 0, 0, 0.3],
    },
    outlined: {
      main: [0, 0, 0, 0],
      focus: [0, 0, 0, 0.04], //on hover or select
      text: [0, 0, 0, 0.87],
      border: [0, 0, 0, 0.23],
      borderFocused: [0, 0, 0, 0.4],
      ripple: [0, 0, 0, 0.3],
    },
  },
  disabled: {
    contained: {
      main: [0, 0, 0, 0.12],
      text: [0, 0, 0, 0.26], //including text, icon
    },
    text: {
      main: [0, 0, 0, 0],
      text: [0, 0, 0, 0.26],
    },
    outlined: {
      main: [0, 0, 0, 0],
      text: [0, 0, 0, 0.26],
      border: [0, 0, 0, 0.12],
    },
  },
};
const SizeMap = {
  sm: { height: 22, fontSize: 13, paddingY: 4, paddingX: 10 },
  md: { height: 24, fontSize: 14, paddingY: 6, paddingX: 16 },
  lg: { height: 26, fontSize: 15, paddingY: 8, paddingX: 22 },
};
export default {
  name: "Button",
  components: { Icon, LoadingEffect },
  mixins: [Rippleable],
  props: {
    //the style of the button
    variant: {
      default: "contained",
      validator: (v) => {
        return [requireOneOf(["contained", "text", "outlined"])].some((test) =>
          test(v)
        );
      },
    },
    //the color theme of the button
    color: {
      default: "default",
      validator: (v) => {
        return [
          requireOneOf(["plain", "default", "primary", "secondary"]),
        ].some((test) => test(v));
      },
    },
    /*
    To control the size of button including width, height, padding, there are 4 ways
    1.use the preset size of button by passing "sm", "md", "lg"
    2.set a specific value by passing a number(here for button the prop of size is an obj, not suitable)
    3.use the custom value in the outer css by passing "auto"(do nothing if not)
    4.pass nothing and a default preset size will be adopted
    Principle: users have to pass a "auto" in order to customize the style in the outer css
    For implementation see computedSize
    */
    size: {
      required: false,
      validator: (v) => {
        return [requireAuto(), requireOneOf(["sm", "md", "lg"])].some((test) =>
          test(v)
        );
      },
    },
    //the following is customized by users
    backgroundColor: {
      required: false,
      type: String,
    },
    hoverBackgroundColor: {
      //background hover color
      required: false,
      type: String,
    },
    border: {
      //1px solid rgba(),only for outlined
      required: false,
      type: String,
    },
    hoverBorder: {
      //1px solid rgba(),only for outlined
      required: false,
      type: String,
    },
    contentColor: {
      //text and icon
      required: false,
      type: String,
    },
    rippleColor: {
      required: false,
      type: String,
    },

    flat: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    rippleFixed: {
      default: false,
      type: Boolean,
    },
    //tricky prop
    delayed: {
      default: false,
      type: Boolean,
    },
    //todo icon margain custom prop
    //icon
    startIcon: {
      type: String,
      required: false,
    },
    endIcon: {
      type: String,
      required: false,
    },
    //loading
    loading: {
      default: false,
      type: Boolean,
    },
    loadingIndicator: {
      //content when loading, by default its a circular animation
      required: false,
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
      return [
        this.variant,
        this.color,
        this.size,
        this.disabled ? "disabled" : "",
        this.flat ? "flat" : "",
      ];
    },
    computedSize() {
      if (this.size === "auto") return null;
      if (!this.size || !SizeMap[this.size]) return this.getSizeFromMap("md");
      //todo customise the props including height, fontSize, padding
      return this.getSizeFromMap(this.size);
    },
    computedBackgroundColor() {
      if (this.disabled)
        return this.getColorFromMap("disabled", this.variant, "main");
      if (this.isHovering)
        return (
          this.hoverBackgroundColor ||
          this.getColorFromMap(this.color, this.variant, "focus")
        );
      else
        return (
          this.backgroundColor ||
          this.getColorFromMap(this.color, this.variant, "main")
        );
    },
    computedBorder() {
      //only for outlined
      if (this.variant === "outlined" && this.disabled)
        return `1px solid ${this.getColorFromMap(
          "disabled",
          this.variant,
          "border"
        )}`;
      else if (this.variant === "outlined" && !this.disabled)
        return `1px solid ${
          this.isHovering
            ? this.hoverBorder ||
              this.getColorFromMap(this.color, this.variant, "borderFocused")
            : this.border ||
              this.getColorFromMap(this.color, this.variant, "border")
        }`;
      else return null;
    },
    computedContentColor() {
      if (this.disabled)
        return this.getColorFromMap("disabled", this.variant, "text");
      return (
        this.contentColor ||
        this.getColorFromMap(this.color, this.variant, "text")
      );
    },
    computedBoxShadow() {
      //only for contained
      if (this.variant === "contained" && !this.disabled && !this.flat)
        return this.isHovering
          ? "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
          : "0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)";
      else return null;
    },

    computedRippleColor() {
      //default rgba(0, 0, 0, 0.3);
      //plain rgba(255, 255, 255, 0.3);
      //primary rgba(25, 118, 210, 0.3);
      //secondary rgba(220, 0, 78, 0.3);
      return (
        this.rippleColor ||
        this.getColorFromMap(this.color, this.variant, "ripple")
      );
    },
  },
  mounted() {},
  methods: {
    getSizeFromMap(type) {
      const preset = SizeMap[type];
      return {
        height: `${preset["height"]}px`,
        fontSize: `${preset["fontSize"]}px`,
        padding: `${preset["paddingY"]}px ${preset["paddingX"]}px`,
      };
    },
    getColorFromMap(theme, variant, type) {
      const colorThemeSet = ColorThemeMap[theme] || ColorThemeMap["default"];
      const colorVariantSet =
        colorThemeSet[variant] || ColorThemeMap["contained"];
      let rgba = colorVariantSet[type];
      if (!rgba)
        throw Error(
          `Not Found the ${type}-color of ${theme}-variant of ${variant}`
        );
      return this.parseColor(rgba);
    },
    parseColor(inputColorArray, alpha) {
      let arr = [...inputColorArray];
      if (alpha) arr[3] = alpha;
      return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`;
    },
    handleHoverEnter() {
      if (this.disabled) return;
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (this.disabled) return;
      this.isHovering = false;
    },
    handleButtonClick(e) {
      if (this.disabled) return;
      console.log("Inner onButtonClick");
      // this.$emit("click", e);
      this.createRippleByAddingLayer(
        e,
        this.rippleFixed,
        this.computedRippleColor
      );
      //todo deley to wait for ripple finishing
      if (this.delayed) {
        setTimeout(() => {
          this.$emit("click", e);
        }, 200);
      } else {
        this.$emit("click", e);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.remove-button-default {
  margin: 0;
  outline: none;
  border: none;
  cursor: pointer;
  user-select: none;
}
button {
  .remove-button-default();
  border-radius: 0.25rem;
  box-sizing: content-box;
  font-weight: 600;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &.flat {
    box-shadow: none;
  }
  &.disabled {
    cursor: default;
    box-shadow: none;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    .icon-placeholder {
      position: relative;
      width: 20px;
      height: 20px;
      &.start {
        margin-left: -4px;
        margin-right: 8px;
      }
      &.end {
        margin-right: -4px;
        margin-left: 8px;
      }
    }
    .text-placeholder {
      position: relative;
      .text {
        //for loading effect
        transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        &.loading {
          opacity: 0;
        }
      }
    }
  }
}
.v-enter-active {
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 100ms;
}
.v-leave-active {
  transition: opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.v-enter, .v-leave-to{
  opacity: 0;
}
</style>
