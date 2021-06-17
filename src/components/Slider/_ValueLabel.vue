<template>
  <transition :name="`fade-${this.vertical ? 'vertical' : 'horizontal'}`"
    ><section
      class="value-label"
      :style="{ ...computedPosition }"
      v-show="active"
    >
      <div
        class="inner-circle"
        :style="{ background: computedColor, transform: computedRotation }"
      >
        <span class="text" :style="{ transform: computedTextRotation }">{{
          value
        }}</span>
      </div>
    </section></transition
  >
</template>
<script>
export default {
  name: "ValueLabel",
  components: {},
  props: {
    value: {
      type: String,
    },
    color: {
      type: String,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    computedColor() {
      return this.color;
    },
    computedPosition() {
      if (this.vertical) return { right: "45px" };//add padding 13px offset 32+13=45
      else return { top: "-32px" };
    },
    computedRotation() {
      if (this.vertical) return "rotate(225deg)";
      else return "rotate(-45deg)";
    },
    computedTextRotation() {
      if (this.vertical) return "rotate(-225deg)";
      else return "rotate(45deg)";
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.value-label {
  position: absolute;
  .inner-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50% 50% 50% 0;
    .text {
      font-size: 12px;
      color: #fff;
    }
  }
}

.fade-horizontal {
  &-enter-active,
  &-leave-active {
    transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform-origin: 50% 100%;
  }
  &-leave-to,
  &-enter {
    transform: scale(0);
    opacity: 0;
  }
}
.fade-vertical {
  &-enter-active,
  &-leave-active {
    transition: opacity 120ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform-origin: 0% 50%;
  }
  &-leave-to,
  &-enter {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
