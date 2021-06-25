<template>
  <section class="rating" :class="classes" :style="{}">
    <span class="dev-info" v-if="dev"></span>
  </section>
</template>
<script>
// import { requireOneOf } from "../common/validator";
//import IconButton from "../Button/IconButton.vue";
export default {
  name: "Rating",
  components: {},
  props: {
    value: {
      type: Number,
    },
        name: {
      type: String,
      required: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dev: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isHovering: false,
    };
  },
  computed: {
    classes() {
      return [this.disabled ? "disabled" : ""];
    },
  },
  methods: {
    handleHoverEnter() {
      if (this.disabled) return;
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (this.disabled) return;
      this.isHovering = false;
    },
  },
};
</script>
<style lang="less" scoped>
.rating {
  position: relative;
  .dev-info {
    position: absolute;
    line-height: 28px;
    top: 50%;
    left: 110%;
    transform: translateY(-50%);
    user-select: none;
  }
}
</style>
