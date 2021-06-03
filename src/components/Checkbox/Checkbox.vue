<template>
  <section class="checkbox">
    <span
      class="icon-button"
      :style="{ ...checkboxSize, ...mainBgColor }"
      @click="handleCheck"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
    >
      <svg
        :style="{ ..._iconSize, fill: iconFillColor }"
        class="icon"
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path :d="renderIcon"></path>
      </svg>
    </span>
    <span class="label-placeholder" @click="handleCheck">{{ this.label }}</span>
  </section>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
import { requireOneOf, requirePositiveNumber } from "../common/validator";
const SizeMap = {
  sm: { checkbox: 38, icon: 20 },
  md: { checkbox: 42, icon: 24 },
  lg: { checkbox: 46, icon: 28 },
};
const ColorThemeMap = {
  default: {
    main: [0, 0, 0, 0],
    focus: [0, 0, 0, 0.04], //on hover or select
    icon: [0, 0, 0, 0.54],
    ripple: [0, 0, 0, 0.3],
  },
  primary: {
    main: [0, 0, 0, 0],
    focus: [25, 118, 210, 0.04], //on hover or select
    icon: [25, 118, 210, 0.8],
    ripple: [25, 118, 210, 0.3],
  },
  secondary: {
    main: [0, 0, 0, 0],
    focus: [220, 0, 78, 0.04], //on hover or select
    icon: [220, 0, 78, 0.8],
    ripple: [220, 0, 78, 0.3],
  },
};
const IconEmptyBox =
  "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z";
const IconCheckMarkBox =
  "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z";
const IconDashBox =
  "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z";
export default {
  name: "CheckBox",
  components: {},
  mixins: [Rippleable],
  props: {
    padding: {
      type: Array,
      default: function() {
        return [0, 0, 0, 0];
      },
    },
    color: {
      default: "default",
      validator: (v) => {
        return ["default", "primary", "secondary"].indexOf(v) !== -1;
      },
    },
    //size of checkbox
    size: {
      default: "md",
      validator: (v) => {
        return [
          requireOneOf(["sm", "md", "lg"]),
          requirePositiveNumber(),
        ].some((test) => test(v));
      },
    },
    iconSize: {
      default: "md",
      validator: (v) => {
        return [
          requireOneOf(["sm", "md", "lg"]),
          requirePositiveNumber(),
        ].some((test) => test(v));
      },
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    checked: {
      default: false,
      type: Boolean,
    },
    indeterminate: {
      default: false,
      type: Boolean,
    },
    label: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      //basically a checkbox can have only two states:'checked' and 'unchecked'
      //sometimes a checkbox can have the third state: 'indeterminate'
      state: "unchecked",
      isHovering: false,
      //
      isChecked: this.checked,
      isDisabled: this.disabled,
      isIndeterminate: this.indeterminate,
    };
  },
  computed: {
    renderIcon() {
      let icon = "";
      switch (this.state) {
        case "checked":
          icon = IconCheckMarkBox;
          break;
        case "unchecked":
          icon = IconEmptyBox;
          break;
        case "indeterminate":
          icon = IconDashBox;
          break;
        default:
          icon = IconEmptyBox;
          break;
      }
      return icon;
    },
    mainBgColor() {
      if (this.isHovering)
        return {
          background:
            this.hoverColor || this.getColorFromTheme(this.color, "focus"),
        };
      else {
        return {
          background: "transparent",
        };
      }
    },
    iconFillColor() {
      if (this.disabled) return "rgba(0, 0, 0, 0.26)";
      if (this.isHovering && this.iconHoverColor) return this.iconHoverColor;
      else return this.iconColor || this.getColorFromTheme(this.color, "icon");
    },
    checkboxSize() {
      if (this.size) {
        let value = this.getSize(this.size, "checkbox");
        return {
          width: `${value}px`,
          height: `${value}px`,
        };
      } else {
        return {};
      }
    },
    _iconSize() {
      if (this.iconSize) {
        let value = this.getSize(this.iconSize, "icon");
        return {
          width: `${value}px`,
          height: `${value}px`,
        };
      } else {
        return {};
      }
    },
    rippleRenderColor() {
      return this.rippleColor || this.getColorFromTheme(this.color, "ripple");
    },
    styleBox() {
      let padding = "";
      for (let i of this.padding) {
        padding += i.toString() + "px ";
      }
      console.log("styleBox", padding);
      return {
        padding,
      };
    },
    classCheckbox() {
      let color = this.color;
      let size = this.size;
      //no default color for indeterminate
      if (this.indeterminate && color === "default") {
        color = "secondary";
      }
      let style = [
        color,
        size,
        {
          disabled: this.disabled,
          checked: this.checked,
          indeterminate: this.indeterminate,
        },
      ];
      console.log("classCheckbox", style);
      return style;
    },
  },
  mounted() {},
  methods: {
    getColorFromTheme(theme, type) {
      let colorSet = ColorThemeMap[theme] || ColorThemeMap["default"];
      let rgba = colorSet[type];
      if (!rgba) throw Error(`Not Found the ${type}-color of ${theme}`);
      return this.parseColor(rgba);
    },
    parseColor(inputColorArray, alpha) {
      let arr = [...inputColorArray];
      if (alpha) arr[3] = alpha;
      return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`;
    },
    getSize(input, type) {
      if (SizeMap[input] !== undefined) return SizeMap[input][type];
      else return input;
    },
    handleHoverEnter() {
      if (this.disabled) return;
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (this.disabled) return;
      this.isHovering = false;
    },
    handleCheck(e) {
      if (this.disabled) return;
      else {
        if (this.state === "unchecked") {
          this.state = "checked";
          this.$emit("check", { value: true });
        } else if (this.state === "checked") {
          this.state = "unchecked";
          this.$emit("check", { value: false });
        }
        //ripple
        if (!e.currentTarget.classList.value.includes("label-placeholder")) {
          this.createRipple(e, true, this.rippleColor);
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.checkbox {
  display: flex;
  align-items: center;
  .icon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  .label-placeholder {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.01em;
    user-select: none;
    cursor: pointer;
  }
}
</style>
