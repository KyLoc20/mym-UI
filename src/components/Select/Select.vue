<template>
  <section class="select">
    <section class="container">
      <div class="input-outer" @click="handleOpenMenu">
        <input
          type="text"
          :id="id"
          placeholder=" "
          ref="input"
          v-model="valueSelected"
          @focus="handleFocus"
        />
        <label :for="id" v-if="!noLabel" :class="disabled ? 'disabled' : ''"
          >{{ label }}{{ this.required ? " * " : "" }}</label
        >
        <span class="value-text" :class="disabled ? 'disabled' : ''">{{
          valueShowing
        }}</span>
        <span class="synchronizing-trick-activeindex" v-show="false">{{
          activeIndex
        }}</span>
        <span
          class="expand-action"
          :class="!isMenuOpened ? 'towards-down' : 'towards-up'"
        >
          <Icon
            name="down"
            size="md"
            :class="disabled ? 'disabled' : ''"
          ></Icon>
        </span>
        <span class="base-underline" :class="disabled ? 'disabled' : ''"></span>
        <span class="focus-underline"></span>
        <span class="focus-layer"></span>
      </div>
      <div class="helper" v-if="helper" :class="disabled ? 'disabled' : ''">
        <span class="text">{{ helper }}</span>
      </div>
      <transition name="leftfade">
        <div class="menu" v-if="isMenuOpened" :style="menuPos">
          <div
            class="control-mask"
            v-if="isMaskOpened"
            @click="handleCloseMask"
          ></div>
          <div
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
          </div>
        </div></transition
      >
    </section>
  </section>
</template>
<script>
import Icon from "../Icon/Icon.vue";
import Navigable from "../../mixins/navigable";
import Rippleable from "../../mixins/rippleable";
//todo flexible width responding to value-text
export default {
  name: "Select",
  props: {
    label: {
      type: String,
    },
    items: {
      type: Array,
    },
    activeIndex: {
      //-1 for None
      type: Number,
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
    noLabel: {
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
  },
  components: {
    Icon,
  },
  mixins: [Navigable, Rippleable],
  data() {
    return {
      id: null,
      // valueSelected: null,
      cValue: null,
      //menu
      isMenuOpened: false,
      isMaskOpened: false,
    };
  },
  mounted() {
    this.id = this._uid;
    //init value from prop
    this.initValue();
    console.log("mounted", this.id, this.cValue);
  },
  updated() {
    //update value from prop
    this.initValue();
    console.log("updated", this.id, this.cValue);
  },
  computed: {
    itemsFiltered() {
      return [{ label: "$special", text: "None" }, ...this.items];
    },
    valueSelected() {
      if (this.cValue === null && this.placeholder) {
        //with placeholder
        return this.placeholder;
      } else return this.cValue;
    },
    valueShowing() {
      //for template
      if (this.cValue === null) {
        if (this.placeholder) return this.placeholder;
        else if (this.noLabel) return "None";
        else return this.valueSelected;
      } else return this.valueSelected;
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
    handleSelect(index, e) {
      if (this.disabled) return;
      let label = e;
      console.log("handleSelect", index, label);
      if (label === "$special") {
        //None -> clear the selection
        this.cValue = null;
        this.$refs.input.blur();
        this.$emit("change", { label: null });
      } else {
        this.$refs.input.focus();
        this.cValue = label;
      }
      this.reportChange(label, index);
      this.openMenu(false);
    },
    reportChange(label, index) {
      //the 0 is None added later
      this.$emit("change", { label: label, index: index });
    },
    handleFocus() {
      //console.log("handleFocus");
      if (this.disabled) this.$refs.input.blur();
    },
    openMenu(opened) {
      console.log("openMenu", opened);
      this.isMenuOpened = opened;
      this.isMaskOpened = opened;
    },
    handleOpenMenu() {
      if (this.disabled || this.readonly) return;
      this.openMenu(true);
      this.$refs.input.focus();
    },
    handleCloseMask() {
      this.$refs.input.focus();
      this.openMenu(false);
    },
  },
};
</script>
<style lang="less" scoped>
.select {
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    // max-width: 120px;
    .input-outer {
      position: relative;
      display: flex;
      input {
        width: 120px;
        height: 32px;
        padding: 6px 24px 7px 0;
        box-sizing: border-box;
        border: none;
        cursor: pointer;
        color: transparent; //hide focus cursor
        user-select: none;
      }
      input:focus {
        outline: none;
        &::selection {
          //todo hide the value of input
          background: transparent;
          color: transparent;
        }
      }
      input:not(:focus) ~ .focus-underline {
        transform: scaleX(0);
      }
      input:not(:focus) ~ .focus-layer {
        background: transparent;
      }
      input:focus + label {
        color: #1976d2;
        transform: translateY(calc(-100% - 6px)) translateX(-10%) scale(0.8);
      }
      input:not(:placeholder-shown) + label {
        transform: translateY(calc(-100% - 6px)) translateX(-10%) scale(0.8);
      }
      label {
        position: absolute;
        top: 6px;
        color: rgba(0, 0, 0, 0.54);
        transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
          transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
        font-family: "Roboto", "Helvetica";
        font-size: 16px;
        line-height: 16px;
        text-transform: capitalize;
        user-select: none;
        &.disabled {
          color: rgba(0, 0, 0, 0.38);
        }
      }

      .value-text {
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
        border-bottom: 1px solid rgba(0, 0, 0, 0.42);
        transition: border-bottom-color 200ms cubic-bezier(0.4, 0.2, 0, 1);
      }
      &:hover .base-underline:not(.disabled) {
        border-bottom: 2px solid rgba(0, 0, 0, 0.87);
      }
      .base-underline.disabled {
        border-bottom: 1px dotted rgba(0, 0, 0, 0.87);
      }
      .focus-underline {
        .underline();
        transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);
        transform-origin: 50% 50%;
        border-bottom: 2px solid #1976d2;
      }
      .focus-layer {
        .underline();
        height: 100%;
        background: rgba(0, 0, 0, 0.05);
        transition: background 200ms cubic-bezier(0.4, 0.2, 0, 1);
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
    .helper {
      display: flex;
      margin-top: 3px;
      color: rgba(0, 0, 0, 0.54);
      font-size: 12px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      letter-spacing: 0.03333em;
      &.disabled {
        color: rgba(0, 0, 0, 0.38);
      }
    }

    .menu {
      position: absolute;
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
        0px 8px 10px 1px rgba(0, 0, 0, 0.14),
        0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      background: #fff;
      padding: 8px 0;
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
      .outer {
        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
        &.selected {
          background-color: rgba(0, 0, 0, 0.08);
        }
        display: flex;
        align-items: center;
        transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        .anchor {
          width: 100%;
          height: 36px;
          padding: 6px 16px;
          box-sizing: border-box;
          font-size: 16px;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          color: rgba(0, 0, 0, 0.87);
          transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
}
.fade {
  transition: opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.fade-action {
  transform: scale(0);
  opacity: 0;
}
.leftfade {
  &-enter-active,
  &-leave-active {
    .fade();
    transform-origin: 0px 26px;
  }
  &-leave-to,
  &-enter {
    .fade-action();
  }
}
</style>
