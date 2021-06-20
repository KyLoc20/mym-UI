<template>
  <section class="autocomplete" :class="classes" :style="{}">
    <div class="text-field-wrapper">
      <section
        class="test-input"
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
    </div>
    <span class="dev-info" v-if="dev">{{computedMatchingContent}}</span>
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
      inputValue: null, //currently user input value
      cValue: null, //currently user selected value
    };
  },
  computed: {
    classes() {
      return [this.disabled ? "disabled" : ""];
    },
    computedMatchingContent(){
      return "$"+this.inputValue
    },
    computedInputBorder() {
      //only for outlined
      if (this.isFocused) return "1px solid rgba(25, 118, 210, 1)";
      else if (this.isHovering) return "1px solid rgba(0, 0, 0, 1)";
      else return "1px solid rgba(0, 0, 0, 0.23)";
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
      if (!this.disabled) this.isFocused = true;
    },
    handleBlur() {
      if (!this.disabled) this.isFocused = false;
    },
    handleInput() {
      if(!this.inputValue)return
      console.log("handleInput", this.inputValue);
      this.resetContent();
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
    .test-input {
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
</style>
