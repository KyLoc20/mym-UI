<template>
  <transition name="fade"
    ><section
      class="chip"
      :class="classChip"
      @click="handleClick"
      v-if="isAlive"
    >
      <div class="thumbnail">
        <icon v-if="iconAvailable" :name="iconName" :size="iconSize"></icon>
      </div>
      <div class="content">
        <span class="text">{{ text }}</span>
      </div>
      <transition name="fade">
        <div class="select" v-if="selectable && isSelected">
          <icon name="check" size="auto"></icon>
        </div>
      </transition>
      <div class="remove" v-if="removable" @click="handleRemove">
        <icon name="cross" size="auto"></icon>
      </div></section
  ></transition>
</template>
<script>
import Iconable from "../../mixins/iconable";
import Rippleable from "../../mixins/rippleable";
export default {
  name: "Chip",
  components: {},
  mixins: [Iconable, Rippleable],
  data() {
    return {
      isAlive: true,
      isSelected: this.selected,
    };
  },
  props: {
    text: {
      type: String,
    },
    color: {
      default: "default",
      validator: (v) => {
        return ["default", "primary", "secondary"].indexOf(v) !== -1;
      },
    },
    removable: {
      type: Boolean,
      default: false,
    },
    //whether can be selected
    selectable: {
      type: Boolean,
      default: false,
    },
    //whether be selected
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classChip() {
      let color = this.color + "-chip";
      let selected = this.selectable && this.isSelected ? "selected" : "";
      return color + " " + selected;
    },
  },
  methods: {
    handleClick(e) {
      this.createRipple(
        e,
        false,
        this.color === "default" ? "default" : "plain"
      );
      if (this.selectable) {
        this.handleSelect();
      }
    },
    handleRemove() {
      if (this.removable && this.isAlive) {
        this.isAlive = false;
        this.$emit("remove");
        console.log("chip remove: ", this.text);
      }
    },
    handleSelect() {
      console.log(this.text, "handleSelect", this.isSelected);
      if (this.selectable) {
        this.isSelected = !this.isSelected;
        this.$emit("select");
      }
    },
  },
};
</script>
<style lang="less" scoped>
@default-color: #e0e0e0;
@primary-color: #1976d2;
@secondary-color: #dc004e;
.chip {
  display: flex;
  align-items: center;
  box-sizing: border-box;

  font-size: 10px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  height: 3.2em;
  border-radius: 1.6em;
  cursor: pointer;
  user-select: none;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  .content {
    padding: 1.2em;
    .text {
      font-size: 1.4em;
    }
  }
  .thumbnail {
    margin-left: 0.4em;
    margin-right: -0.4em;
    .icon {
      //todo icon svg is not responsive
      width: 2.4em;
      height: 2.4em;
    }
  }
  .remove {
    margin-left: -0.4em;
    margin-right: 0.8em;
    .icon {
      //todo icon svg is not responsive
      width: 2.2em;
      height: 2.2em;
    }
  }
  .select {
    margin-left: -0.4em;
    margin-right: 0.8em;
    .icon {
      //todo icon svg is not responsive
      width: 2.2em;
      height: 2.2em;
    }
  }
}
.light-icon {
  .icon {
    color: rgba(255, 255, 255, 0.7);
    fill: currentColor;
    &:hover {
      color: #fff;
    }
  }
}
.dark-icon {
  .icon {
    color: rgba(0, 0, 0, 0.26);
    fill: currentColor;
    &:hover {
      color: rgba(0, 0, 0, 0.4);
    }
  }
}
.default-chip {
  background: @default-color;
  color: rgba(0, 0, 0, 0.87);

  &:hover,
  &.selected {
    background: rgb(206, 206, 206);
  }
  .thumbnail {
    .icon {
      color: #616161;
      fill: currentColor;
    }
  }
  .remove {
    .dark-icon();
  }
  .select {
    .dark-icon();
  }
}
.primary-chip {
  background: @primary-color;
  color: #fff;
  .thumbnail {
    .icon {
      color: #fff;
      fill: currentColor;
    }
  }
  &:hover,
  &.selected {
    background: rgb(43, 128, 213);
  }
  .remove {
    .light-icon();
  }
  .select {
    .light-icon();
  }
}
.secondary-chip {
  background: @secondary-color;
  color: #fff;
  .thumbnail {
    .icon {
      color: #fff;
      fill: currentColor;
    }
  }
  &:hover,
  &.selected {
    background-color: rgb(245, 20, 100);
  }
  .remove {
    .light-icon();
  }
  .select {
    .light-icon();
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.fade-enter,
.fade-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
