<template>
  <section class="autocomplete" :class="classes" :style="{}">
    <div class="text-field-wrapper">
      <section
        class="test-input-component"
        :style="{ border: computedInputBorder }"
        @mouseenter="handleHoverEnter"
        @mouseleave="handleHoverLeave"
      >
        <input
          type="text"
          :id="id"
          :placeholder="placeholder"
          ref="input"
          v-model.trim="inputValue"
          @keyup.enter="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </section>
      <transition name="fade-from-center">
        <section class="option-menu" v-if="menuToggled">
          <div class="control-mask" @click="handleStopSelectByMask"></div>
          <Option
            class="none"
            v-if="availableOptions.length === 0"
            :label="noneOptionText"
            disabled
          ></Option>
          <Option
            v-for="item in availableOptions"
            :key="item.label"
            :label="item.label"
            @select="handleDoneSelect"
          ></Option></section
      ></transition>
    </div>
    <span class="dev-info" v-if="dev">{{ computedMatchingContent }}</span>
  </section>
</template>
<script>
// import { requireOneOf } from "../common/validator";
import Option from "./_Option.vue";
export default {
  name: "Autocomplete",
  components: { Option },
  props: {
    options: {
      type: Array,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    dev: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    //the following are user custom props
    noneOptionText: {
      type: String,
      default: "No options",
    },
  },
  data() {
    return {
      id: null,
      isHovering: false,
      isFocused: false,
      menuToggled: false,
      inputValue: null, //currently user input value
      cValue: null, //currently user selected value
    };
  },
  mounted() {
    this.id = this._uid;
  },
  computed: {
    classes() {
      return [this.disabled ? "disabled" : ""];
    },
    computedMatchingContent() {
      return `inputValue: ${this.inputValue} cValue: ${this.cValue}`;
    },
    computedInputBorder() {
      //only for outlined
      if (this.isFocused) return "1px solid rgba(25, 118, 210, 1)";
      else if (this.isHovering) return "1px solid rgba(0, 0, 0, 1)";
      else return "1px solid rgba(0, 0, 0, 0.23)";
    },
    parsedOptions() {
      if (!this.options) return [];
      else return this.options.map((item) => item.label.toLowerCase());
    },
    availableOptions() {
      return this.doPreciseMatching(this.inputValue, this.options);
    },
  },
  methods: {
    restoreInput() {
      //clear when input unmatched
      if (!this.cValue) this.clearInput();
      //back to the last matched input
      else this.inputValue = this.cValue;
    },
    clearInput() {
      this.inputValue = "";
    },
    handleHoverEnter() {
      if (this.disabled) return;
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (this.disabled) return;
      this.isHovering = false;
    },
    handleFocus() {
      // console.log("handleFocus");
      if (this.disabled) return;
      this.isFocused = true;
      this.menuToggled = true;
    },
    handleBlur() {
      // console.log("handleBlur");
      if (this.disabled) return;
      this.isFocused = false;
      this.menuToggled = false;
      this.restoreInput();
    },
    handleInput() {
      if (!this.inputValue) return;
      console.log("handleInput", this.inputValue);
      this.clearInput();
    },
    handleStopSelectByMask() {
      this.$refs.input.blur();
      // this.menuToggled = false;
      // console.log("handleStopSelect", this.menuToggled);
    },
    handleDoneSelect(e) {
      this.cValue = e.label;
      this.inputValue = e.label;
      this.menuToggled = false;
      console.log("handleDoneSelect", e.label);
    },
    doPreciseMatching(input, candidates) {
      /* candidates:[{label},] */
      if (!input) return candidates;
      else
        return candidates.filter(
          (item) => item.label.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
    },
    doFuzzyMatching() {
      return 1;
    },
  },
};
</script>
<style lang="less" scoped>
.autocomplete {
  position: relative;
  .text-field-wrapper {
    .test-input-component {
      width: 300px;
      height: 56px;
      padding: 9px 39px 9px 9px;
      border-radius: 4px;
      box-sizing: border-box;
      transition: border 100ms cubic-bezier(0.4, 0.2, 0, 1) 0ms;
      display: flex;
      input {
        width: 100%;
        padding: 7.5px 4px 7.5px 6px;
        border: none;
        cursor: inherit;
        user-select: none;
        color: rgba(0, 0, 0, 0.87);
        font-weight: 400;
        font-size: 16px;
        &:focus {
          outline: none;
        }
      }
    }
    .option-menu {
      position: absolute;
      top: 100%;
      left: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: 304px; //36*8+16=304
      padding: 8px 0;
      border-radius: 4px;
      overflow-y: scroll;
      background-color: #fff;
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
        0px 8px 10px 1px rgba(0, 0, 0, 0.14),
        0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      .control-mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
      }
    }
  }
  .dev-info {
    position: absolute;
    line-height: 28px;
    top: 50%;
    left: 110%;
    transform: translateY(-50%);
    user-select: none;
  }
}
.fade-from-center {
  &-enter-active,
  &-leave-active {
    transition: opacity 120ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      transform 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform-origin: 50% 0px;
  }
  &-leave-to,
  &-enter {
    transform: translateY(-5%);
    opacity: 0;
  }
}
</style>
