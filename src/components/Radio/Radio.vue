<template>
  <section class="radio" @click="handleSelect">
    <input
      type="radio"
      :id="getId"
      :value="label"
      @focus="handleFocus"
      @blur="handleBlur"
      :checked="isSelected"
      :disabled="disabled"
    />
    <label
      :for="getId"
      class="ripple-wrapper"
      :class="disabled ? 'disabled' : ''"
      @click="handleClickRipple"
    ></label>
    <div class="icon-wrapper icon-ring">
      <div class="icon">
        <svg
          class="icon"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="icon-wrapper icon-circle">
      <div class="icon">
        <svg
          class="icon"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
          ></path>
        </svg>
      </div>
    </div>
    <label :for="getId" class="radio-text" :class="disabled ? 'disabled' : ''"
      >{{ text }}
    </label>
  </section>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
export default {
  name: "Radio",
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
  components: {},
  mixins: [Rippleable],
  computed: {
    getId() {
      return this._uid;
    },
    isSelected() {
      //controlled by its parent
      if (this.exclusive) return this.checked;
      else return this.isSelectedSelf;
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
    handleSelect() {
      if (this.disabled) return;
      console.log(
        "handleSelect",
        this.label,
        this.groupIndex,
        this.isSelectedSelf
      );
      if (!this.exclusive) this.isSelectedSelf = !this.isSelectedSelf;
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
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.radio {
  display: flex;
  position: relative;
  min-width: 42px;
  min-height: 42px;
  display: flex;
  align-items: center;
  input {
    position: absolute;
    width: 42px;
    height: 42px;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
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
    &:checked ~ .icon-wrapper .icon,
    &:focus ~ .icon-wrapper .icon {
      color: rgb(220, 0, 78);
    }
    &:checked ~ .icon-circle,
    &:focus ~ .icon-circle {
      transform: scale(1);
    }
  }
  .ripple-wrapper {
    .round-shape();
    position: absolute;
    left: 0;
    top: 0;
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
    left: 0;
    top: 0;
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
        width: 24px;
        height: 24px;
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
    margin-left: 42px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
