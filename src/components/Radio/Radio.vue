<template>
  <section class="radio">
    <div class="group-header" v-if="group" :class="isFocused ? 'focused' : ''">
      <span class="text">{{ group }}</span>
    </div>
    <div class="group-content">
      <div
        class="outer"
        v-for="(item, idx) in items"
        :key="idx"
        @click="handleSelect(item.label, idx, item.disabled)"
      >
        <input
          type="radio"
          :id="getId(idx)"
          :value="item.label"
          @focus="handleFocus(idx)"
          @blur="handleBlur(idx)"
          :checked="item.label === cValue"
          :disabled="item.disabled"
        />
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
        <label
          :for="getId(idx)"
          class="radio-item"
          :class="item.disabled ? 'disabled' : ''"
          >{{ item.text }}
        </label>
      </div>
    </div>
  </section>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
export default {
  name: "Radio",
  props: {
    group: {
      //group title
      type: String,
      required: false,
    },
    items: {
      //{label,text}
      type: Array,
    },
    defaultValue: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      id: null,
      isFocused: false,
      cValue: null,
    };
  },
  mounted() {
    this.id = this._uid;
    this.initValue();
  },
  components: {},
  mixins: [Rippleable],
  computed: {},
  methods: {
    initValue() {
      if (
        this.defaultValue &&
        this.confirmFieldExisted(this.items, "label", this.defaultValue)
      ) {
        this.cValue = this.defaultValue;
      }
    },
    confirmFieldExisted(arr, field, value) {
      //to check value v3 of field label whether exists in a certain entry of the arr:[{label:v1},{label:v2},{label:v3},]
      for (let entry of arr) {
        if (entry[field] && entry[field] === value) return true;
      }
      return false;
    },
    getId(subName) {
      return `${this.id}-${subName}`;
    },
    handleFocus(e) {
      console.log("handleFocus", e);
      this.isFocused = true;
      //todo create ripple as sibling
      //its not available to create a ripple as a child for input
    },
    handleBlur(e) {
      console.log("handleBlur", e);
      this.isFocused = false;
    },
    handleSelect(label, index, disabled) {
      if (disabled) return;
      console.log("handleSelect", label, index);
      this.cValue = label;
      this.$emit("change", { label, index });
    },
    handleClickRipple(e) {
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
.radio {
  display: flex;
  flex-direction: column;
  .group-header {
    &.focused {
      color: #1976d2;
    }
    .base-font();
    padding: 0;
    margin-left: 9px;
    color: rgba(0, 0, 0, 0.54);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    user-select: none;
  }
  .group-content {
    display: flex;
    flex-direction: column;
    .outer {
      position: relative;
      margin-right: 16px;
      min-width: 160px;
      height: 42px;
      // absolute input and absolute icon yes
      // relative input and absolute icon no, input will be covered
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
      }
      input:focus {
        outline: none;
        opacity: 0;
      }
      input:disabled {
        & ~ .icon-wrapper .icon {
          color: rgba(0, 0, 0, 0.38);
        }
        cursor: default;
      }
      input:checked ~ .icon-wrapper,
      input:focus ~ .icon-wrapper {
        .icon {
          color: rgb(220, 0, 78);
        }
      }
      input:not(:disabled):hover ~ .icon-ring {
        background: rgba(220, 0, 78, 0.04);
      }

      input:checked ~ .icon-circle,
      input:focus ~ .icon-circle {
        transform: scale(1);
      }
      .icon-wrapper {
        position: absolute;
        width: 42px;
        height: 42px;
        border-radius: 50%;
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
        transform: scale(0);
      }

      label {
        &.disabled {
          color: rgba(0, 0, 0, 0.38);
          cursor: default;
        }
        .base-font();
        height: 100%;
        margin-left: 42px;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
