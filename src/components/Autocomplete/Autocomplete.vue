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
          autocomplete="off"
          :id="id"
          :placeholder="placeholder"
          ref="input"
          v-model.trim="inputValue"
          @keyup.enter="handleDoneSelect(currentLabel)"
          @keydown.up="handleLookUp($event, 'up')"
          @keydown.down="handleLookUp($event, 'down')"
          @keydown.esc="handleStopSelect"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <label :for="id" ref="label"></label>

        <div class="btn-wrapper">
          <transition>
            <IconButton
              v-show="shouldClearButtonDisplayed"
              icon="cross"
              v-bind="computedButtonStyles"
              @click="handleClearInput"
            ></IconButton>
          </transition>
        </div>
      </section>
      <transition name="fade-from-center">
        <section class="option-menu" v-if="menuToggled" ref="menu">
          <div class="control-mask" @click="handleStopSelect"></div>
          <Option
            class="none"
            v-if="availableOptions.length === 0"
            :label="noneOptionText"
            disabled
          ></Option>
          <Option
            v-for="(item, idx) in availableOptions"
            :parser="parseOption"
            :key="item.label"
            :option="item"
            :label="item.label"
            :touched="lookupIndex === idx"
            :selected="cValue === item.label"
            @select="handleDoneSelect(item.label)"
          ></Option></section
      ></transition>
    </div>
    <span class="dev-info" v-if="dev">{{ computedMatchingContent }}</span>
  </section>
</template>
<script>
// import { requireOneOf } from "../common/validator";
import Option from "./_Option.vue";
import IconButton from "../Button/IconButton.vue";
export default {
  name: "Autocomplete",
  components: { Option, IconButton },
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
    //todo renderOption
    /* 
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ fontSize: 15, '& > span': { mr: '10px', fontSize: 18 } }}
          {...props}
        >
          <span>{countryToFlag(option.code)}</span>
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
    */
    parseOption: {
      //define how to parse the label text by the props of each option
      //called by [_Option]
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      id: null,
      isHovering: false,
      isFocused: false,
      isSelectionConfirmed: false, //go true when a label is selected which allows availableOptions to have all options next time when focused
      //the only 2 ways to close the menu when handleBlur or handleDoneSelect
      menuToggled: false,
      inputValue: null, //currently user input value
      cValue: null, //currently user selected value
      lookupIndex: null, //keyborad controller
    };
  },
  mounted() {
    this.id = this._uid;
  },
  watch: {
    cValue:function(newValue) {
      this.$emit("change",{value:newValue})
    },
    inputValue: function(newValue) {
      //this is for opening the closed menu due to handleDoneSelect or handleBlur when changing the input
      let shouldReopen = true;
      //after handleBlur is called, this.inputValue will be restored to this.cValue
      //NOTICE this condition will also be triggered when handleDoneSelect, however it makes sense too
      if (newValue === this.cValue) shouldReopen = false;
      console.log("inputValue changed shouldReopen: ", shouldReopen);
      this.menuToggled = shouldReopen;

      //this is for force availableOptions to return to normal function which filters options exactly
      if (this.isSelectionConfirmed && newValue !== this.cValue)
        this.isSelectionConfirmed = false;

      this.$emit("inputchange",{value:newValue})
    },
    lookupIndex: function(newValue) {
      //todo scroll when looking up by keydown, however the size is default option height 36px, problems could appear when many large-sized options exist
      const elMenu = this.$refs.menu;
      if (elMenu)
        elMenu.scroll({
          top: newValue * 36,
          left: 0,
          behavior: "smooth",
        });
    },
    availableOptions: function() {
      //this is for updating lookupIndex responding to availableOptions
      this.lookupIndex = this.calcIndexOfAvailableOptions(this.cValue);
    },
  },
  computed: {
    classes() {
      return [this.disabled ? "disabled" : ""];
    },

    shouldClearButtonDisplayed() {
      return this.cValue !== null && (this.isFocused || this.isHovering);
    },
    computedButtonStyles() {
      return {
        size: 28,
        iconSize: 20,
        disrippled: true,
      };
    },
    computedMatchingContent() {
      return `inputValue: ${this.inputValue} cValue: ${this.cValue} idx:${this.lookupIndex} 
      label:${this.currentLabel} availableOptions-num:${this.availableOptions.length} 
      menuToggled:${this.menuToggled} isSelectionConfirmed:${this.isSelectionConfirmed}`;
    },
    computedInputBorder() {
      //only for outlined
      if (this.isFocused) return "1px solid rgba(25, 118, 210, 1)";
      else if (this.isHovering) return "1px solid rgba(0, 0, 0, 1)";
      else return "1px solid rgba(0, 0, 0, 0.23)";
    },
    currentLabel() {
      if (this.lookupIndex === null) return undefined;
      const optionObj = this.availableOptions[this.lookupIndex];
      if (optionObj === undefined) return undefined;
      else return optionObj.label;
    },
    parsedOptions() {
      if (!this.options) return [];
      else return this.options.map((item) => item.label.toLowerCase());
    },
    availableOptions() {
      if (this.isSelectionConfirmed)
        return this.doNoneMatching(this.inputValue, this.options);
      return this.doPreciseMatching(this.inputValue, this.options);
    },
  },
  methods: {
    restoreInput() {
      //input content has been clear when blurred, reset to null
      if (this.inputValue === "") {
        this.inputValue = null;
        this.cValue = null;
      }
      //clear to null or go back to the last matched input
      else{
        console.log("clear to null or go back to the last matched input")
        this.inputValue = this.cValue;
      } 
    },
    handleClearInput() {
      if (this.disabled) return;
      if (this.cValue === null) return;
      console.log("handleClearInput");
      this.cValue = null;
      this.restoreInput();
      this.$refs.input.focus();
    },
    handleLookUp(e, direction) {
      if (this.disabled) return;
      e.preventDefault();
      if (this.lookupIndex === null)
        this.lookupIndex =
          this.direction === "up" ? this.availableOptions.length - 1 : 0;
      else {
        if (direction === "up")
          this.lookupIndex =
            this.lookupIndex === 0
              ? this.availableOptions.length - 1
              : this.lookupIndex - 1;
        else
          this.lookupIndex =
            this.lookupIndex === this.availableOptions.length - 1
              ? 0
              : this.lookupIndex + 1;
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
    handleStopSelect() {
      this.$refs.input.blur();
    },
    handleDoneSelect(label) {
      if (label === undefined) return;
      this.cValue = label;
      this.inputValue = label;
      this.menuToggled = false;
      this.isSelectionConfirmed = true; //enable availableOptions to have all options next time when focused
      //todo maybe problem when availableOptions updated
      console.log("handleDoneSelect", label);
    },
    calcIndexOfAvailableOptions(label) {
      const arr = this.availableOptions.map((option) => option.label);
      const index = arr.indexOf(label);
      return index === -1 ? null : index;
    },
    doNoneMatching(input, candidates) {
      //give back all candidates
      return input ? candidates : candidates;
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
      position: relative;
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
      label {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        cursor: text;
        width: 100%;
        height: 100%;
      }
      .btn-wrapper {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
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
      z-index: 5;
      .control-mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
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
.v-enter-active,
.v-leave-active {
  transition: opacity 200ms cubic-bezier(0.4, 0.2, 0, 1);
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
