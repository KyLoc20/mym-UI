<template>
  <section class="rating" :class="classes" :style="{}">
    <div
      class="unit-wrapper"
      v-for="ratingValue in computedRatings"
      :key="ratingValue"
      @mousemove="handleHover($event, ratingValue)"
      @mouseenter="handleHoverEnter(ratingValue)"
      @mouseleave="handleHoverLeave(ratingValue)"
      @mousedown="handleDoneSelect($event, ratingValue)"
    >
      <Unit
        :rating="ratingValue"
        :size="calcSize"
        :scaled="calcScaledForUnit(ratingValue)"
        :colorRange="calcColorRangeForUnit(ratingValue)"
        :disabled="disabled"
        :readonly="readonly"
        :icon="getIcon(ratingValue)"
        :activeIcon="getIcon(ratingValue, true)"
        :color="color"
      ></Unit>
    </div>
    <div class="dev-info" v-if="dev">
      <span>value-{{ value }}</span>
      <span>selectedUnit-{{ selectedUnit }}</span>
      <span>hoveringUnit-{{ hoveringUnit }}</span>
      <span>hoverRange-{{ hoverRange }}</span>
      <span>hoveringValue-{{ hoveringValue }}</span>
    </div>
  </section>
</template>
<script>
import Unit from "./_Unit.vue";
import { requireOneOf, requirePositiveNumber } from "../common/validator";
const SizeMap = {
  sm: 18,
  md: 24,
  lg: 30,
};
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
    size: {
      validator: (v) => {
        return [
          requirePositiveNumber(),
          requireOneOf(["sm", "md", "lg"]),
        ].some((test) => test(v));
      },
      required: false,
    },
    precision: {
      //to split one unit to parts, at least 2 -> (0,0.5]
      type: Number,
      required: false,
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
    clickable: {
      type: Boolean,
      default: true,
    },
    dev: {
      type: Boolean,
      default: false,
    },
    //custom
    color: {
      type: String,
      required: false,
    },
    //todo icon management
    icon: {
      //inactive: unselected
      type: String,
      required: false,
    },
    activeIcon: {
      //hovering or selected
      type: String,
      required: false,
    },
    iconGroup: {
      /* 
      custom icons for each rating
      [{icon,activeIcon},{icon,activeIcon},{icon,activeIcon},{icon,activeIcon},{icon,activeIcon},]
      the index corresponding to rating, if not use the default
      */
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      hoverRange: 1, //records the cursor position to the Unit width [0,1]
      hoveringUnit: 0, //[1,max] by ratingValue
      selectedUnit: this.value,
      hoveringValue: this.value, //current hovering value, this triggers onHoverChange
    };
  },
  watch: {
    value(newValue) {
      //outer controller when prop value updates
      this.selectedUnit = newValue;
    },
    selectedUnit(newValue) {
      this.hoveringValue = newValue;
    },
    hoveringValue(newValue) {
      this.$emit("hoverchange", { value: newValue });
    },
  },
  computed: {
    classes() {
      return [];
    },
    computedRatings() {
      return new Array(this.max).fill(1).map((element, index) => index + 1);
    },
    computedPrecision() {
      if (this.precision && this.precision <= 0.5) return this.precision;
      //by default no splits
      else return 1;
    },
    calcSize() {
      const input = this.size;
      if (typeof input === "number") return input;
      else return SizeMap[input] || SizeMap["md"];
    },
  },
  methods: {
    getIcon(rating, needActive) {
      if (this.iconGroup) {
        return needActive
          ? this.iconGroup[rating - 1]?.activeIcon || this.activeIcon
          : this.iconGroup[rating - 1]?.icon || this.icon;
      } else return needActive ? this.activeIcon : this.icon;
    },
    calcScaledForUnit(rating) {
      //this.hoveringUnit===rating exactly hovering
      //this.hoveringUnit=2.5 rating=3 half hovering
      return rating - this.hoveringUnit < 1 && rating - this.hoveringUnit >= 0;
    },
    calcColorRangeForUnit(rating) {
      //once hovering, color from the far left
      if (this.hoveringUnit) {
        //only for the hovering Unit with precision, calc the colorRange
        if (rating === this.hoveringUnit) {
          let num = Math.ceil(this.hoverRange / this.computedPrecision);
          this.hoveringValue = num * this.computedPrecision + (rating - 1);
          return num * this.computedPrecision;
        } else {
          if (this.iconGroup) return this.hoveringUnit === rating ? 1 : 0;
          return this.hoveringUnit >= rating ? 1 : 0;
        }
      } else {
        //when not hovering, directly dicided by this.selectedUnit
        if (this.iconGroup) {
          //only one unit colored
          return this.selectedUnit === rating ? 1 : 0;
        }
        if (rating > Math.ceil(this.selectedUnit)) {
          return 0;
        } else {
          if (rating <= this.selectedUnit) {
            //not consider precision
            return 1;
          } else {
            let num = Math.floor(
              (this.selectedUnit - (rating - 1)) / this.computedPrecision
            );
            return num * this.computedPrecision;
          }
        }
      }
    },
    handleHover(e, rating) {
      //todo throttle
      if (this.disabled || this.readonly) return;
      //const elBCR = e.currentTarget.getBoundingClientRect();
      //e.clientX-elBCR.left will be influenced by scale
      this.hoveringUnit = rating;
      if (this.computedPrecision !== 1) {
        this.hoverRange = e.offsetX / this.calcSize;
      }
    },
    handleHoverEnter(rating) {
      if (this.disabled || this.readonly) return;
      this.hoveringUnit = rating;
    },
    handleHoverLeave() {
      if (this.disabled || this.readonly) return;
      this.hoveringUnit = 0;
      this.hoveringValue = this.selectedUnit;
    },
    handleDoneSelect(e, rating) {
      //todo forbidden click
      if (!this.clickable) return;
      e.preventDefault();
      if (this.disabled || this.readonly) return;
      let newValue = null;
      if (this.computedPrecision !== 1) {
        //require to calc precision
        let num = Math.ceil(this.hoverRange / this.computedPrecision);
        newValue = rating - 1 + num * this.computedPrecision;
      } else newValue = rating;
      //repeat selection will reset
      if (newValue === this.selectedUnit)
        (newValue = 0), (this.hoveringUnit = 0);
      this.$emit("change", {
        name: this.name,
        beforeValue: this.selectedUnit,
        value: newValue,
      });
      this.selectedUnit = newValue;
      //console.log("handleDoneSelect", rating, this.selectedUnit);
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
    display: flex;
    flex-direction: column;
    width: 200px;
    line-height: 28px;
    top: 50%;
    left: 110%;
    transform: translateY(-50%);
    user-select: none;
  }
}
</style>
