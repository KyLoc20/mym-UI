<template>
  <section class="rating" :class="classes" :style="{}">
    <div
      class="unit-wrapper"
      v-for="ratingValue in computedRatings"
      :key="ratingValue"
      @mouseenter="handleHoverEnter(ratingValue)"
      @mouseleave="handleHoverLeave(ratingValue)"
    >
      <Unit
        :rating="ratingValue"
        :value="value"
        :scaled="calcScaledForUnit(ratingValue)"
        :colored="calcColoredForUnit(ratingValue)"
        :disabled="disabled"
        :readonly="readonly"
        @select="handleDoneSelect"
      ></Unit>
    </div>
    <span class="dev-info" v-if="dev">{{ value }}+{{selectedUnit}}</span>
  </section>
</template>
<script>
import Unit from "./_Unit.vue";
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
      hoveringUnit: 0, //[1,max] by ratingValue
      selectedUnit: this.value,
    };
  },
  watch: {
    value(newValue) {
      //outer controller when prop value updates
      this.selectedUnit = newValue;
    },
  },
  computed: {
    classes() {
      return [];
    },
    computedRatings() {
      return new Array(this.max).fill(1).map((element, index) => index + 1);
    },
  },
  methods: {
    calcScaledForUnit(rating) {
      //this.hoveringUnit===rating exactly hovering
      //this.hoveringUnit=2.5 rating=3 half hovering
      return rating - this.hoveringUnit < 1 && rating - this.hoveringUnit >= 0;
    },
    calcColoredForUnit(rating) {
      //once hovering, color from the far left
      if (this.hoveringUnit) return this.hoveringUnit >= rating;
      else return this.selectedUnit >= rating;
    },
    handleHoverEnter(which) {
      if (this.disabled||this.readonly) return;
      this.hoveringUnit = which;
    },
    handleHoverLeave() {
      if (this.disabled||this.readonly) return;
      this.hoveringUnit = 0;
    },
    handleDoneSelect(e) {
      let newValue = e.value;
      //repeat selection will reset
      if (newValue === this.selectedUnit) newValue = 0,this.hoveringUnit=0;
      this.$emit("change", { beforeValue: this.selectedUnit, value: newValue });
      this.selectedUnit = newValue;
      // console.log("handleDoneSelect", e, this.selectedUnit);
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
