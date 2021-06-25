<template>
  <section class="rating" :class="classes" :style="{}">
    <div class="unit-wrapper" v-for="ratingValue in computedRatings" :key="ratingValue">
      <Unit :rating="ratingValue" :value="value"></Unit>
    </div>
    <span class="dev-info" v-if="dev"></span>
  </section>
</template>
<script>
import Unit from "./_Unit.vue"
export default {
  name: "Rating",
  components: { Unit },
  props: {
    value: {
      //currently value by user
      type: Number,
    },
    max: {
      type: Number,
      default: 5,
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
    computedRatings() {
      return new Array(this.max).fill(1).map((element, index) => index + 1);
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
  display: flex;
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
