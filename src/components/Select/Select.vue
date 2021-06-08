<template>
  <section class="select">
    <span class="test">{{ isFocused }}</span>
    <div
      class="input-wrapper"
      @mousedown="handleWannaSelect"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
    >
      <input
        type="text"
        :id="id"
        ref="input"
        v-model="valueSelected"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <label
        :for="id"
        v-if="labelDisplayed"
        :style="{
          color: computedLabelColor,
          transform: computedLabelPosition,
        }"
        >{{ computedLabelText }}</label
      >
      <span class="selected-value" :style="{ color: computedSelectedColor }">{{
        computedDisplayedValue
      }}</span>
      <span class="synchronizing-trick-activeindex" v-show="false">{{
        activeIndex
      }}</span>
      <span
        class="expand-action"
        :class="menuToggled ? 'towards-up' : 'towards-down'"
      >
        <Icon name="down" size="md" :class="disabled ? 'disabled' : ''"></Icon>
      </span>
      <span
        class="base-underline"
        :style="{ borderBottom: computedBaseUnderlineBorder }"
      ></span>
      <span
        class="focus-underline"
        :style="{ transform: computedFocusUnderlineScale }"
      ></span>
    </div>
    <div class="input-helper" v-if="helper" :class="disabled ? 'disabled' : ''">
      <span class="text" :style="{ color: computedHelperColor }">{{
        helper
      }}</span>
    </div>
    <transition name="fade-from-left">
      <div class="input-menu" v-if="menuToggled" :style="menuPos">
        <div class="control-mask" @mousedown="handleStopSelect"></div>
        <div class="item-wrapper item-none"></div>
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
    <!-- <div
            class="item"
            :style="{}"
            @mousedown="handleDoneSelect($event, item.label, idx)"
          >
            <span class="text">{{ item.text }}</span>
          </div>
        </div> -->
    <!-- <div
          class="outer"
          v-for="(item, idx) in itemsFiltered"
          :key="idx"
          @click="handleClick"
          :class="valueSelected === item.label ? 'selected' : ''"
        >
          <anchor
            :label="item.label"
            :icon="item.icon | sizeAdder('md')"
            @select="handleSelect(idx, $event)"
          >
            <template>{{ item.text }}</template>
          </anchor>
        </div> -->
  </section>
</template>
<script>
import Icon from "../Icon/Icon.vue";
import Rippleable from "../../mixins/rippleable";
import SelectItem from "./SelectItem.vue";
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
    labelDisplayed: {
      type: Boolean,
      default: true,
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
    //the following props are for user custom
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
    };
  },
  mounted() {
    this.id = this._uid;
    //init value from prop
    this.initValue();
    // console.log("mounted", this.id, this.cValue);
  },
  updated() {
    //update value from prop
    this.initValue();
    // console.log("updated", this.id, this.cValue);
  },
  computed: {
    computedLabelText() {
      return `${this.label}${this.required ? " * " : ""}`;
    },
    computedSelectedColor() {
      if (this.disabled) return "rgba(0, 0, 0, 0.38)";
      else return this.selectedColor || "rgba(0, 0, 0, 0.87)";
    },
    computedLabelColor() {
      if (this.disabled) return "rgba(0, 0, 0, 0.38)";
      else if (this.isFocused) return "rgba(25, 118, 210, 1)";
      else return this.labelColor || "rgba(0, 0, 0, 0.54)";
    },
    computedLabelPosition() {
      const floatingEffect =
        "translateY(calc(-100% - 6px)) translateX(-10%) scale(0.8)";
      //when the input is focused or the input is valued or the input is placeholdered
      if (this.isFocused || this.cValue || this.placeholder)
        return floatingEffect;
      return null;
    },
    computedHelperColor() {
      if (this.disabled) return "rgba(0, 0, 0, 0.38)";
      else return this.helperColor || "rgba(0, 0, 0, 0.54)";
    },
    computedBaseUnderlineBorder() {
      if (this.disabled) return "1px dotted rgba(0, 0, 0, 0.87)";
      else if (this.isHovering) return "2px solid rgba(0, 0, 0, 0.87)";
      else return "1px solid rgba(0, 0, 0, 0.42)";
    },
    computedFocusUnderlineScale() {
      //shrink when not focused
      if (!this.isFocused) return "scaleX(0)";
      else return "scaleX(1)";
    },
    computedDisplayedValue() {
      //for showing if not valued or has no placeholder it displays nothing and the label goes back from floating
      if (!this.cValue) return this.placeholder;
      else return this.cValue;
    },
    itemsFiltered() {
      return [{ label: "$special", text: "None" }, ...this.items];
    },
    valueSelected() {
      return this.cValue;
    },

    menuPos() {
      let size = 36,
        items = this.itemsFiltered;
      //based on the index of valueSelected
      for (let i = 0; i < items.length; i++) {
        if (items[i].label === this.valueSelected) {
          return { top: `${-8 - i * size}px` };
        }
      }
      return { top: 0 };
    },
  },
  methods: {
    handleHoverEnter() {
      if (this.disabled) return;
      console.log("handleHoverEnter");
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (this.disabled) return;
      console.log("handleHoverLeave");
      this.isHovering = false;
    },
    handleFocus() {
      //console.log("handleFocus");
      if (!this.disabled) this.isFocused = true;
    },
    handleBlur() {
      //console.log("handleBlur");
      if (!this.disabled) this.isFocused = false;
    },
    initValue() {
      //todo safety check
      if (this.activeIndex !== undefined) {
        if (this.activeIndex === -1) {
          this.cValue = null;
        } else {
          this.cValue = this.items[this.activeIndex].label;
        }
      }
    },
    handleClick(e) {
      this.createRipple(e, false, "default");
    },
    handleWannaSelect() {
      if (this.disabled || this.readonly) return;
      this.menuToggled = true;
      this.$refs.input.focus();
    },
    handleStopSelect() {
      //by clicking control-mask
      this.menuToggled = false;
    },
    handleDoneSelect(e) {
      if (this.disabled) return;
      let {label,index}=e
      console.log("handleSelectDone", label, index);
      this.$refs.input.focus();
      this.cValue = label;
      this.menuToggled = false;
      this.$emit("change", { label, index });
    },
  },
};
</script>
<style lang="less" scoped>
.select {
  position: relative;
  width: 120px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 16px;
  // max-width: 120px;
  .test {
    position: absolute;
    right: 200%;
  }
  .input-helper {
    //helpful description text below the input
    width: 100%;
    margin-top: 3px;
    word-wrap: break-word;
    word-break: break-all;
    .text {
      font-size: 12px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      letter-spacing: 0.03333em;
    }
  }
  .input-wrapper {
    width: 100%;
    position: relative;
    display: flex;
    cursor: pointer;
    input {
      width: 100%;
      height: 32px;
      padding: 6px 24px 7px 0;
      box-sizing: border-box;
      border: none;
      cursor: pointer;
      color: transparent; //hide focus cursor and value
      user-select: none;
    }
    .hide-selection {
      //todo hide the value of input when selecting
      background: transparent;
      color: transparent;
    }
    input::selection {
      .hide-selection();
    }
    input:focus {
      outline: none;
      &::selection {
        .hide-selection();
      }
    }
    label {
      position: absolute;
      top: 6px;
      transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
        transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      font-family: "Roboto", "Helvetica";
      font-size: 16px;
      line-height: 16px;
      text-transform: capitalize;
      user-select: none;
    }

    .selected-value {
      position: absolute;
      top: 6px;
      color: rgba(0, 0, 0, 0.87);
      font-family: "Roboto", "Helvetica";
      font-size: 16px;
      line-height: 18px;
      text-transform: capitalize;
      cursor: pointer;
      user-select: none;
      &.disabled {
        color: rgba(0, 0, 0, 0.38);
      }
    }
    .underline {
      position: absolute;
      width: 100%;
      bottom: 0;
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
    .expand-action {
      position: absolute;
      top: 4px;
      right: 0;
      .icon {
        width: 24px;
        height: 24px;
        &.disabled {
          color: rgba(0, 0, 0, 0.38);
        }
      }
      cursor: pointer;
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
</style>
