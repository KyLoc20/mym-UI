<template>
  <section class="select" :class="classes" :style="{ width: computedWidth }">
    <div
      class="input-wrapper"
      :style="{
        padding: computedInputWrapperPadding,
        border: computedInputWrapperBorder,
        background: computedBackgroundColor,
      }"
      @mousedown="handleWannaSelect"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
    >
      <input
        type="text"
        :id="id"
        ref="input"
        v-model="cValue"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <label
        :for="id"
        ref="label"
        v-if="!labelHidden"
        :style="{
          color: computedLabelColor,
          top: computedLabelPositionTop,
          transform: computedLabelFloating,
          background: computedLabelBackgroundColor,
        }"
        >{{ computedLabelText }}</label
      >
      <span
        class="selected-value"
        ref="selected"
        :style="{
          color: computedSelectedColor,
          top: computedSelectedPositionTop,
        }"
        >{{ computedDisplayedValue }}</span
      >
      <span
        class="tricky-label-for-fitting"
        ref="trickyLabel"
        v-if="fitWidth"
        :style="{
          top: computedLabelPositionTop,
        }"
        >{{ computedLabelText }}</span
      >
      <span class="synchronizing-trick-activeindex" v-show="false">{{
        activeIndex
      }}</span>
      <span
        class="menu-control-action"
        :class="menuToggled ? 'towards-up' : 'towards-down'"
        :style="{
          top: computedMenuControllerPositionTop,
          right: computedMenuControllerPositionRight,
        }"
      >
        <Icon
          name="down"
          :size="24"
          :style="{ color: computedIconFillColor }"
        ></Icon>
      </span>
      <span
        class="base-underline"
        v-if="variant !== 'outlined'"
        :style="{ borderBottom: computedBaseUnderlineBorder }"
      ></span>
      <span
        class="focus-underline"
        v-if="variant !== 'outlined'"
        :style="{ transform: computedFocusUnderlineScale }"
      ></span>
    </div>
    <div class="input-helper" v-if="helper">
      <span class="text" :style="{ color: computedHelperColor }">{{
        helper
      }}</span>
    </div>
    <transition :name="menuDown ? 'fade-from-center' : 'fade-from-left'">
      <div
        class="input-menu"
        v-if="menuToggled"
        :style="{ top: computedMenuPositionTop }"
      >
        <div class="control-mask" @mousedown="handleStopSelect"></div>
        <div class="item-wrapper">
          <select-item
            class="item-none"
            :label="'$none'"
            :text="'None'"
            :index="-1"
            @select="handleDoneSelect"
          ></select-item>
        </div>
        <div class="item-wrapper" v-for="(item, idx) in items" :key="idx">
          <select-item
            :label="item.label"
            :text="item.text"
            :index="idx"
            :selected="item.label === cValue"
            @select="handleDoneSelect"
          ></select-item>
        </div>
      </div>
    </transition>
    <span class="dev-context" v-if="dev">{{ isFocused }}</span>
  </section>
</template>
<script>
import Icon from "../Icon/Icon.vue";
import Rippleable from "../../mixins/rippleable";
import SelectItem from "./_SelectItem.vue";
import { requireOneOf } from "../common/validator";
//todo flexible width responding to selected-value
export default {
  name: "Select",
  props: {
    items: {
      //[ { label: "twenty", text: "Twenty" },]
      type: Array,
    },
    activeIndex: {
      //-1 for None
      type: Number,
      required: false,
    },
    variant: {
      default: "standard",
      validator: (v) => {
        return [requireOneOf(["standard", "filled", "outlined"])].some((test) =>
          test(v)
        );
      },
    },
    /* 
    There are 3 types of description text in this component:
    1.label can be floating above the inpout content;
    2.helper is the description text below the input;
    3.placeholder appears in the position of selected item when no item selected;
    */
    label: {
      type: String,
      required: false,
    },
    helper: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    //the following are some control props
    menuDown: {
      //select-menu appears under the emitting element if true
      type: Boolean,
      default: false,
    },
    labelHidden: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    errorFound: {
      //if it is true, its appearance will be alarming
      type: Boolean,
      default: false,
    },
    fitWidth: {
      //generate the width by its content
      type: Boolean,
      default: false,
    },
    //the following props are for user custom
    width: {
      type: Number,
      required: false,
    },
    labelColor: {
      type: String,
      required: false,
    },
    selectedColor: {
      //the text color of currently selected value
      type: String,
      required: false,
    },
    helperColor: {
      //the text color of input-helper
      type: String,
      required: false,
    },
    outlinedLabelColor: {
      //only for outlined variant in order to cover border
      type: String,
      required: false,
    },
    dev: {
      //dev mode to show some info
      type: Boolean,
      required: false,
    },
  },
  components: {
    Icon,
    SelectItem,
  },
  mixins: [Rippleable],
  data() {
    return {
      id: null,
      isHovering: false,
      isFocused: false,
      cValue: null,
      menuToggled: false,
      adaptiveWidth: 120,
    };
  },
  mounted() {
    this.id = this._uid;
    //init value from prop
    this.initValue();
    this.adaptiveWidth = this.calcSelectedContentWidth();
  },
  updated() {
    //update value from prop
    this.initValue();
    this.adaptiveWidth = this.calcSelectedContentWidth();
  },
  computed: {
    classes() {
      return [
        this.variant,
        this.disabled ? "disabled" : "",
        this.readonly ? "readonly" : "",
        this.labelHidden ? "labelHidden" : "",
        this.required ? "required" : "",
      ];
    },
    computedWidth() {
      if (this.fitWidth) {
        const paddingPlus = { standard: 24, filled: 44, outlined: 46 }[
          this.variant
        ];
        return `${this.adaptiveWidth + paddingPlus}px`;
      } else return this.width ? `${this.width}px` : "120px";
    },
    //the following are some varieties decided by the prop of variant
    computedInputWrapperPadding() {
      //deciding the size of main border-box
      if (this.variant === "standard") return "20px 24px 5px 0";
      //standard height 48
      else if (this.variant === "filled") return "25px 32px 8px 12px";
      //filled height 56
      else if (this.variant === "outlined") return "15.5px 32px 15.5px 14px";
      //outlined height 56 including border
      else return 0;
    },
    computedInputWrapperBorder() {
      //only for outlined
      if (this.variant !== "outlined") return null;
      if (this.disabled) return "1px solid rgba(0, 0, 0, 0.38)";
      if (this.errorFound)
        return `1px solid rgba(211, 47, 47,${this.isFocused ? 1 : 0.7})`;
      if (this.isFocused) return "1px solid rgba(25, 118, 210, 1)";
      else if (this.isHovering) return "1px solid rgba(0, 0, 0, 1)";
      else return "1px solid rgba(0, 0, 0, 0.23)";
    },
    computedSelectedPositionTop() {
      //main paddingTop +3
      if (this.variant === "standard") return "23px";
      else if (this.variant === "filled") return "28px";
      else if (this.variant === "outlined") return "19.5px";
      else return 0;
    },
    computedMenuControllerPositionTop() {
      //center of main border-box
      if (this.variant === "standard") return "20px";
      else if (this.variant === "filled") return "16px";
      else if (this.variant === "outlined") return "16px";
      else return 0;
    },
    computedMenuControllerPositionRight() {
      if (this.variant === "standard") return 0;
      else if (this.variant === "filled") return "8px";
      else if (this.variant === "outlined") return "8px";
      else return 0;
    },
    computedLabelPositionTop() {
      if (this.variant === "standard") return "24px";
      //standard 8+16
      else if (this.variant === "filled") return "20px";
      //filled 8+16+5
      else if (this.variant === "outlined") return "20px";
      else return 0;
    },
    computedLabelFloating() {
      //when the input is focused or the input is valued or the input is placeholdered
      if (this.isFocused || this.cValue || this.placeholder) {
        switch (this.variant) {
          case "standard":
            return "translateY(calc(-100% - 8px)) translateX(-10%) scale(0.8)";
          case "filled":
            return "translateY(-100%) translateX(-10%) scale(0.8)";
          case "outlined":
            return "translateY(calc(-100% - 12px)) translateX(-10%) scale(0.8)";
          default:
            return "translateY(calc(-100% - 8px)) translateX(-10%) scale(0.8)";
        }
      } else return null;
    },
    computedMenuPositionTop() {
      //by input height
      if (this.menuDown)
        return (
          { standard: "48px", filled: "56px", outlined: "56px" }[
            this.variant
          ] || "48px"
        );
      const menuPadding = 8;
      const mainPadding = { standard: 20, filled: 25, outlined: 15.5 }[
        this.variant
      ];
      const size = 36;
      for (let [index, el] of this.items.entries()) {
        if (el.label === this.cValue)
          return `${mainPadding - menuPadding - (index + 1) * size}px`;
      }
      return `${mainPadding - menuPadding}px`;
    },
    computedIconFillColor() {
      if (this.disabled) return "rgba(0, 0, 0, 0.38)";
      else return "rgba(0, 0, 0, 0.54)";
    },
    computedLabelBackgroundColor() {
      //specially for outlined variant in order to cover border
      if (this.variant === "outlined")
        return this.outlinedLabelColor || "rgba(255,255,255,1)";
      else return null;
    },
    computedBackgroundColor() {
      //only for filled
      if (this.variant !== "filled") return null;
      else if (this.isHovering) return "rgba(0, 0, 0, 0.09)";
      else return "rgba(0, 0, 0, 0.06)";
    },
    computedLabelText() {
      return `${this.label}${this.required ? " * " : ""}`;
    },
    computedSelectedColor() {
      if (this.disabled) return "rgba(0, 0, 0, 0.38)";
      else return this.selectedColor || "rgba(0, 0, 0, 0.87)";
    },
    computedLabelColor() {
      if (this.disabled) return "rgba(0, 0, 0, 0.38)";
      if (this.errorFound) return "rgba(211, 47, 47,1)";
      if (this.isFocused) return "rgba(25, 118, 210, 1)";
      else return this.labelColor || "rgba(0, 0, 0, 0.54)";
    },
    computedHelperColor() {
      if (this.disabled) return "rgba(0, 0, 0, 0.38)";
      if (this.errorFound) return "rgba(211, 47, 47,1)";
      else return this.helperColor || "rgba(0, 0, 0, 0.54)";
    },
    computedBaseUnderlineBorder() {
      if (this.disabled) return "1px dotted rgba(0, 0, 0, 0.87)";
      if (this.errorFound) return "2px solid rgba(211, 47, 47,1)";
      if (this.isHovering) return "2px solid rgba(0, 0, 0, 0.87)";
      else return "1px solid rgba(0, 0, 0, 0.42)";
    },
    computedFocusUnderlineScale() {
      //shrink when not focused or errorFound
      if (this.errorFound || !this.isFocused) return "scaleX(0)";
      else return "scaleX(1)";
    },
    computedDisplayedValue() {
      //value text for showing
      if (this.cValue) return this.cValue;
      else if (this.placeholder) return this.placeholder;
      //if not valued or has no placeholder it displays nothing and the label goes back from floating
      else return this.cValue;
    },
  },
  methods: {
    calcSelectedContentWidth() {
      const defaultWidth = 120;
      if (!this.$refs.selected) return defaultWidth;
      const boundingRect = this.$refs.selected.getBoundingClientRect();
      //use content width or placeholder width
      if (boundingRect.width) return boundingRect.width * 1.25;
      else {
        //use a fixed-width trick-label instead when none is selected and no placeholder
        if (!this.$refs.trickyLabel) return defaultWidth;
        const labelBoundingRect = this.$refs.trickyLabel.getBoundingClientRect();
        // console.log("trick-label is selected", labelBoundingRect.width);
        return labelBoundingRect.width * 1.25 || 120;
      }
    },
    handleHoverEnter() {
      if (this.disabled) return;
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (this.disabled) return;
      this.isHovering = false;
    },
    //todo maybe its better not to use this.$refs.input.focus(); to control this.isFocused, directly instead.
    handleFocus() {
      if (!this.disabled) this.isFocused = true;
    },
    handleBlur() {
      if (!this.disabled) this.isFocused = false;
    },
    initValue() {
      if (this.activeIndex === undefined || this.activeIndex === -1)
        this.cValue = null;
      else
        this.cValue = this.items[this.activeIndex]
          ? this.items[this.activeIndex].label
          : null;
    },
    handleWannaSelect(e) {
      e.preventDefault();
      if (this.disabled) return;
      this.$refs.input.focus();
      if (this.readonly) return;
      this.menuToggled = true;
    },
    handleStopSelect(e) {
      e.preventDefault();
      //by clicking control-mask
      this.menuToggled = false;
    },
    handleDoneSelect(e) {
      if (this.disabled) return;
      let { label, index } = e;

      if (label === "$none") this.$refs.input.blur();
      else this.$refs.input.focus();
      this.cValue = label;
      this.menuToggled = false;
      this.$emit("change", { label, index });
      console.log("handleSelectDone", label, index, this.menuToggled);
    },
  },
};
</script>
<style lang="less" scoped>
.select {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 120px;
  transition: background 200ms cubic-bezier(0.4, 0.2, 0, 1) 0ms;
  .dev-context {
    position: absolute;
    left: -150%;
  }
  &.filled .input-wrapper {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &.outlined .input-wrapper {
    border-radius: 4px;
  }
  &.disabled .input-wrapper {
    cursor: default;
  }
  .input-wrapper {
    position: relative;
    display: flex;
    cursor: pointer;
    height: 23px;
    transition: border 200ms cubic-bezier(0.4, 0.2, 0, 1) 0ms;
    input {
      width: 100%;
      padding: 0;
      border: none;
      cursor: inherit;
      user-select: none;
      .content-hidden {
        //hide the value of input and the cursor including situations when text-selected, focused
        color: transparent;
        background: transparent;
      }
      .content-hidden();
      &::selection {
        .content-hidden();
      }
      &:focus {
        outline: none;
        &::selection {
          .content-hidden();
        }
      }
    }

    label,
    .tricky-label-for-fitting {
      position: absolute;
      transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
        transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      font-family: "Roboto", "Helvetica";
      font-size: 16px;
      line-height: 16px;
      text-transform: capitalize;
      cursor: inherit;
      user-select: none;
      padding: 0 1px;
    }
    .tricky-label-for-fitting {
      opacity: 0;
    }
    .selected-value {
      position: absolute;
      font-family: "Roboto", "Helvetica";
      font-size: 16px;
      line-height: 18px;
      text-transform: capitalize;
      // cursor: pointer;
      user-select: none;
    }
    .underline {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    .base-underline {
      .underline();
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0.2, 0, 1);
    }
    .focus-underline {
      .underline();
      transition: transform 200ms cubic-bezier(0.4, 0.2, 0, 1);
      border-bottom: 2px solid #1976d2;
    }
    .menu-control-action {
      position: absolute;
      right: 0;
      // cursor: pointer;
      transition: transform 100ms cubic-bezier(0.4, 0.2, 0, 1);
      &.towards-down {
        transform: rotate(0);
      }
      &.towards-up {
        transform: rotate(180deg);
      }
    }
  }
  .input-menu {
    position: absolute;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    background: #fff;
    padding: 8px 0;
    //todo responsive width
    min-width: 120px;
    z-index: 10;
    .control-mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -10;
    }
    .item-wrapper {
      display: flex;
    }
  }
  .input-helper {
    //helpful description text below the input
    width: 100%;
    box-sizing: border-box;
    padding: 3px 4px 0;
    .text {
      font-size: 12px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      letter-spacing: 0.03333em;
      word-wrap: break-word;
      // word-break: break-all;
    }
  }
}
.fade-from-left {
  &-enter-active,
  &-leave-active {
    transition: opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform-origin: 0px 26px;
  }
  &-leave-to,
  &-enter {
    transform: scale(0);
    opacity: 0;
  }
}
.fade-from-center {
  &-enter-active,
  &-leave-active {
    transition: opacity 120ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform-origin: 50% 0px;
  }
  &-leave-to,
  &-enter {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
