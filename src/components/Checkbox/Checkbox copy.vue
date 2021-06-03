<template>
  <section class="container">
    <section
      class="check-box"
      :class="classCheckbox"
      :style="styleBox"
      @click="onActive"
    >
      <svg
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
        :class="isChecked ? 'active' : ''"
      >
        <path
          v-if="isChecked & !isIndeterminate"
          d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        ></path>
        <path
          v-if="!isChecked & !isIndeterminate"
          d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        ></path>
        <path
          v-if="isIndeterminate"
          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
        ></path>
      </svg>
    </section>
    <span class="label-text" @click="onActive">{{ this.label }}</span>
  </section>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
export default {
  name: "CheckBox",
  components: {},
  mixins: [Rippleable],
  props: {
    padding: {
      type: Array,
      default: function () {
        return [0, 0, 0, 0];
      },
    },
    color: {
      default: "default",
      validator: (v) => {
        return ["default", "primary", "secondary"].indexOf(v) !== -1;
      },
    },
    size: {
      default: "md",
      validator: (v) => {
        return ["md", "sm"].indexOf(v) !== -1;
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
      isChecked: this.checked,
      isDisabled: this.disabled,
      isIndeterminate: this.indeterminate,
    };
  },
  computed: {
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
    onActive(e) {
      if (!this.isDisabled) {
        this.isChecked = !this.isChecked;
        if (!e.currentTarget.classList.value.includes("label-text")) {
          this.createRipple(e, true);
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  .label-text {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.01em;
    user-select: none;
    cursor: pointer;
  }
}
.check-box {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  svg {
    margin: 0;
    fill: rgba(0, 0, 0, 0.54);
  }
}
.md {
  width: 42px;
  height: 42px;
  svg {
    width: 24px;
    height: 24px;
  }
}
.sm {
  width: 38px;
  height: 38px;
  svg {
    width: 20px;
    height: 20px;
  }
}
.check-box.disabled {
  cursor: default;
  svg {
    fill: rgba(0, 0, 0, 0.26);
  }
}
.disabled ~ .label-text {
  cursor: default;
  color: rgba(0, 0, 0, 0.38);
}
.default svg.active {
  fill: rgba(0, 0, 0, 0.54);
}
.primary svg.active {
  fill: rgba(25, 118, 210, 0.8);
}
.secondary svg.active {
  fill: rgba(220, 0, 78, 0.8);
}
.default .ripple {
  background-color: rgba(0, 0, 0, 0.3);
}
.primary .ripple {
  background-color: rgba(25, 118, 210, 0.3);
}
.secondary .ripple {
  background-color: rgba(220, 0, 78, 0.3);
}
.check-box:not(.disabled):hover.default {
  background-color: rgba(0, 0, 0, 0.04);
}
.check-box:hover.primary {
  background-color: rgba(25, 118, 210, 0.04);
}
.check-box:hover.secondary {
  background-color: rgba(220, 0, 78, 0.04);
}
.ripple {
  width: 42px;
  height: 42px;
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 400ms ease-in-out;
}
.default .ripple {
  background-color: rgba(0, 0, 0, 0.3);
}
.primary .ripple {
  background-color: rgba(25, 118, 210, 0.3);
}
.secondary .ripple {
  background-color: rgba(220, 0, 78, 0.3);
}

@keyframes ripple {
  to {
    transform: scale(1);
    opacity: 0.3;
  }
}
</style>