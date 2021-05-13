<template>
  <section
    class="radio"
    @click="handleSelect"
    :style="{ ...containerSize, ...containerMargin }"
    :class="labelPlacement"
  >
    <input
      type="radio"
      :id="getId"
      :value="label"
      @focus="handleFocus"
      @blur="handleBlur"
      :checked="isSelected"
      :disabled="disabled"
      :style="{ ...radioSize, ...inputPlacement }"
      ref="input"
    />
    <label
      :for="getId"
      class="ripple-wrapper"
      :class="disabled ? 'disabled' : ''"
      @click="handleClickRipple"
      :style="{ ...radioSize, ...inputPlacement }"
    ></label>
    <div
      class="icon-wrapper icon-ring"
      :style="{ ...radioSize, ...inputPlacement }"
    >
      <div class="icon">
        <svg
          class="icon"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          :style="svgSize"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
          ></path>
        </svg>
      </div>
    </div>
    <div
      class="icon-wrapper icon-circle"
      :style="{ ...radioSize, ...inputPlacement }"
    >
      <div class="icon">
        <svg
          class="icon"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          :style="svgSize"
        >
          <path
            d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
          ></path>
        </svg>
      </div>
    </div>
    <label
      :for="getId"
      class="radio-text"
      :class="disabled ? 'disabled' : ''"
      :style="textPlacement"
      >{{ text }}
    </label>
  </section>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
import CustomSize from "../../mixins/customSize";
const mapRadioSize = {
  sm: 38, //20 svg
  md: 42, //24 svg
  lg: 46, //28 svg
};
export default {
  name: "Radio",
  components: {},
  mixins: [Rippleable, CustomSize],
  props: {
    label: {
      type: String,
    },
    //todo alias of label
    value: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    groupIndex: {
      //for locating the radio in the group
      type: Number,
      required: false,
    },
    exclusive: {
      //by default radio is exclusive meaning at most one active radio at any time
      //therefore the activation is decided by prop of checked from parent(often [RadioGroup])
      //whereas it can be like a toggle if exclusive is false
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      //isSelected by default
      type: Boolean,
      default: false,
    },
    placement: {
      //of label
      default: "right",
      validator: (v) => {
        return ["right", "bottom", "left", "top"].indexOf(v) > -1;
      },
    },
  },
  data() {
    return {
      id: null,
      isSelectedSelf: null,
      cValue: null,
    };
  },
  mounted() {
    this.isSelectedSelf = this.checked;
  },
  computed: {
    getId() {
      return this._uid;
    },
    isSelected() {
      //controlled by its parent
      if (this.exclusive) return this.checked;
      else return this.isSelectedSelf;
    },
    containerSize() {
      let size = this.getSize(this.size, mapRadioSize);
      return { minWidth: `${size}px`, minHeight: `${size}px` };
    },
    containerMargin() {
      let margin = null;
      const size = 4;
      switch (this.placement) {
        case "right":
          margin = { marginRight: `${size}px` };
          break;
        case "bottom":
          margin = {
            marginRight: `${size * 4}px`,
            marginLeft: `${size * 4}px`,
          };
          break;
        case "top":
          margin = {
            marginRight: `${size * 4}px`,
            marginLeft: `${size * 4}px`,
          };
          break;
        case "left":
          margin = { marginLeft: `${size}px` };
          break;
      }
      return margin;
    },
    radioSize() {
      let size = this.getSize(this.size, mapRadioSize);
      return { width: `${size}px`, height: `${size}px` };
    },

    svgSize() {
      let size = this.getSize(this.size, mapRadioSize) - 18;
      return { width: `${size}px`, height: `${size}px` };
    },
    inputPlacement() {
      let position = null;
      let size = this.getSize(this.size, mapRadioSize);
      //this.placement is the position of radio-text
      switch (this.placement) {
        case "right":
          position = { left: 0 };
          break;
        case "bottom":
          //todo transform: "translate(-50%, 0)" will overload transform:"scale(0)" not recommended
          position = { top: 0, left: `calc(50% - ${size / 2}px)` };
          break;
        case "left":
          position = { right: 0 };
          break;
        case "top":
          position = {
            bottom: 0,
            left: `calc(50% - ${size / 2}px)`,
          };
          break;
      }
      return position;
    },
    textPlacement() {
      let margin = null;
      let size = this.getSize(this.size, mapRadioSize);
      switch (this.placement) {
        case "right":
          margin = { marginLeft: `${size}px` };
          break;
        case "bottom":
          margin = { marginTop: `${size}px`, textAlign: "center" };
          break;
        case "left":
          margin = { marginRight: `${size}px` };
          break;
        case "top":
          margin = { marginBottom: `${size}px`, textAlign: "center" };
          break;
      }
      return margin;
    },
    labelPlacement() {
      return `label-${this.placement}`;
    },
  },
  methods: {
    handleFocus(e) {
      //basically it is to control header of [RadioGroup]
      this.$emit("focus");
      return e;
    },
    handleBlur(e) {
      //basically it is to control header of [RadioGroup]
      // console.log("handleBlur", e);
      this.$emit("blur");
      return e;
    },
    handleSelect(e) {
      //todo if not prevent it will trigger twice thats weird
      if (this.disabled) return;
      if (!this.exclusive) {
        e.preventDefault();
        this.isSelectedSelf = !this.isSelectedSelf;
        // if (this.$refs.input) console.log("input", this.$refs.input.checked);
      }
      console.log(
        "handleSelect",
        this.label,
        this.groupIndex,
        this.isSelectedSelf
      );
      this.$emit("select", { label: this.label, index: this.groupIndex });
    },
    handleClickRipple(e) {
      if (this.disabled) return;
      console.log("handleClickRipple");
      this.createRipple(e, true, "secondary");
    },
  },
};
</script>
<style lang="less" scoped>
.base-font {
  font-size: 16px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  letter-spacing: 0.01em;
}
.round-shape {
  border-radius: 50%;
}
.radio {
  display: flex;
  position: relative;
  align-items: center;
  &.label-right {
    flex-direction: row;
  }
  &.label-left {
    flex-direction: row-reverse;
  }
  input {
    position: absolute;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    // left: 0;
    // top: 0;
    cursor: pointer;
    pointer-events: auto;
    &:focus {
      outline: none;
      opacity: 0;
    }
    &:disabled {
      cursor: default;
    }
    &:disabled ~ .icon-wrapper .icon {
      color: rgba(0, 0, 0, 0.38);
    }
    &:checked ~ .icon-wrapper .icon {
      color: rgb(220, 0, 78);
    }
    &:checked ~ .icon-circle {
      transform: scale(1);
    }
  }
  .ripple-wrapper {
    .round-shape();
    position: absolute;
    // left: 0;
    // top: 0;
    z-index: 10;
    cursor: pointer;
    &.disabled {
      cursor: default;
    }
    &:not(.disabled):hover ~ .icon-ring {
      background: rgba(220, 0, 78, 0.04);
    }
    pointer-events: auto;
  }
  .icon-wrapper {
    position: absolute;
    .round-shape();
    // left: 0;
    // top: 0;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      background 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    .icon {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(0, 0, 0, 0.54);
      svg {
        fill: currentColor;
      }
    }
  }
  .icon-circle {
    transform-origin: 50% 50%;
    transform: scale(0);
  }

  label.radio-text {
    &.disabled {
      color: rgba(0, 0, 0, 0.38);
      cursor: default;
    }
    .base-font();
    cursor: pointer;
    user-select: none;
    width: 100%;
  }
}
</style>
