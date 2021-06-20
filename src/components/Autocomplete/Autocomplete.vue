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
          ref="input"
          v-model.trim="inputValue"
          @keyup.enter="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </section>
      <transition name="fade-from-center">
        <section class="option-menu" v-if="menuToggled">
          <div class="control-mask" @click="handleStopSelect"></div>
          <section
            class="option"
            v-for="item in availableOptions"
            :key="item.label"
            @mousedown="handleDoneSelect($event, item.label)"
          >
            <div class="text">
              {{ item.label }}
            </div>
          </section>
        </section></transition
      >
    </div>
    <span class="dev-info" v-if="dev">{{ computedMatchingContent }}</span>
  </section>
</template>
<script>
// import { requireOneOf } from "../common/validator";
export default {
  name: "Autocomplete",
  components: {},
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
  },
  data() {
    return {
      isHovering: false,
      isFocused: false,
      menuToggled: false,
      inputValue: null, //currently user input value
      cValue: null, //currently user selected value
    };
  },
  computed: {
    classes() {
      return [this.disabled ? "disabled" : ""];
    },
    computedMatchingContent() {
      return `inputValue: ${this.inputValue} cValue: ${this.cValue} `;
    },
    computedInputBorder() {
      //only for outlined
      if (this.isFocused) return "1px solid rgba(25, 118, 210, 1)";
      else if (this.isHovering) return "1px solid rgba(0, 0, 0, 1)";
      else return "1px solid rgba(0, 0, 0, 0.23)";
    },
    availableOptions() {
      return this.options;
    },
  },
  methods: {
    resetContent() {
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
      if (!this.disabled) this.isFocused, (this.menuToggled = true);
    },
    handleBlur() {
      if (!this.disabled) this.isFocused = false;
    },
    handleInput() {
      if (!this.inputValue) return;
      console.log("handleInput", this.inputValue);
      this.resetContent();
    },
    handleStopSelect() {
      // e.preventDefault();
      this.menuToggled = false;
      console.log("handleStopSelect", this.menuToggled);
    },
    handleDoneSelect(e, label) {
      this.cValue = label;
      this.menuToggled = false;
      console.log("handleDoneSelect", e, label);
    },
    doPreciseMatching() {
      return 1;
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
        .content-hidden {
          // hide the value of input and the cursor including situations when text-selected, focused
          color: transparent;
          background: transparent;
        }
        // .content-hidden();
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
    }
    .option-menu {
      position: absolute;
      top: 100%;
      left: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 120px;
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
      .option {
        flex-shrink: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6px 16px;
        box-sizing: border-box;
        cursor: pointer;
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        z-index: 10;
        min-height: 36px;
        .text {
          width: 100%;
          line-height: 24px;
          font-size: 16px;
          user-select: none;
          word-break: break-all;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
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
