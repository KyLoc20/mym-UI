<template>
  <section class="drawer">
    <div class="trigger">
      <vbutton
        variant="text"
        v-if="!icon"
        @click="handleToggle('button', $event)"
        ><slot name="trigger"></slot
      ></vbutton>
      <icon-button
        size="md"
        color="plain"
        aria-label="menu"
        v-if="icon"
        @click="handleToggle('button', $event)"
      ></icon-button>
    </div>

    <transition :name="direction">
      <section class="content-container" v-if="isToggled" :class="direction">
        <slot></slot>
      </section>
    </transition>
    <transition name="fade">
      <div
        class="control-mask"
        v-if="isToggled"
        @click="handleToggle('mask', $event)"
      ></div>
    </transition>
  </section>
</template>
<script>
import Navigable from "@/mixins/navigable";
import Rippleable from "@/mixins/rippleable";
import Vbutton from "../Button/Button";
import IconButton from "../Button/IconButton";
export default {
  name: "CustomDrawer",
  mixins: [Navigable, Rippleable],
  components: { Vbutton, IconButton },
  props: {
    direction: {
      default: "left",
      validator: (v) => {
        return ["left", "right", "top", "bottom"].indexOf(v) !== -1;
      },
    },
    //using icon not text
    icon: {
      required: false,
      type: String,
    },
    //controller of upper cpts
    active: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      toggled: false,
    };
  },
  watch: {
    active(newValue) {
      if (newValue === false) {
        console.log(
          "the Drawer was closed outer controller active -> inacitve"
        );
        this.toggled = false;
      }
    },
    toggled(newValue) {
      if (newValue) {
        //when the drawer is open
        document.documentElement.style.overflow = "hidden";
      } else {
        //when the drawer is close
        document.documentElement.style.overflow = "visible";
      }
    },
  },
  computed: {
    isToggled() {
      console.log("isToggled", this.toggled && this.active);
      return this.toggled && this.active;
    },
  },
  methods: {
    handleToggle(from) {
      //click trigger to open
      if (from === "button" && !this.active) {
        //this situation is that the menu last time was closed by the upper cpt due to goto a link
        //telling the upper cpt to activate the drawer
        //the this.toggled is still true waiting the upper to change the prop active to true
        console.log(
          "telling the upper cpt to activate the drawer",
          this.active,
          this.toggled
        );
        this.$emit("ready");
      }
      this.toggled = !this.toggled;
    },
  },
};
</script>
<style lang="less" scoped>
.horizontal {
  top: 0;
  min-width: 250px;
  height: 100%;
  padding: 8px 0;
}
.vertical {
  min-width: 250px;
  left: 0;
  width: 100%;
  padding: 8px 0;
}
.left {
  .horizontal();
  left: 0;
}
.right {
  .horizontal();
  right: 0;
}
.top {
  .vertical();
  top: 0;
}

.bottom {
  .vertical();
  bottom: 0;
}
.drawer {
  .content-container {
    position: fixed;
    margin: 0;
    overflow-y: scroll;
    background-color: #fff;
    z-index: 1200;
    box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
      0px 16px 24px 2px rgba(0, 0, 0, 0.14),
      0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  }
  .control-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    // pointer-events: none;
  }
}
.fade-enter-active,
.fade-leave-active {
  //todo Big problem: if using opacity, the mask will cover the button's onMouseleave
  transition: transform 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  //   transition: opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(-100%);
  //   opacity: 0;
}
.translate {
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.left {
  &-enter-active,
  &-leave-active {
    .translate();
  }
  &-leave-to,
  &-enter {
    transform: translateX(-100%);
  }
}
.right {
  &-enter-active,
  &-leave-active {
    .translate();
  }
  &-leave-to,
  &-enter {
    transform: translateX(100%);
  }
}
.top {
  &-enter-active,
  &-leave-active {
    .translate();
  }
  &-leave-to,
  &-enter {
    transform: translateY(-100%);
  }
}
.bottom {
  &-enter-active,
  &-leave-active {
    .translate();
  }
  &-leave-to,
  &-enter {
    transform: translateY(100%);
  }
}
</style>
