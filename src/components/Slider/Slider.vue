<template>
  <section
    class="slider"
    :class="classes"
    :style="{ ...computedLength, ...computedThickness }"
  >
    <div
      class="detection-area"
      :style="{ background: computedBackgroundColor, ...computedDetectionArea }"
      @mousedown="handleStartDrag"
    >
      <div
        class="thumb-wrapper"
        :style="{ left: computedThumbPositionLeft, ...computedThumbArea }"
        @mouseenter="handleHoverEnter"
        @mouseleave="handleHoverLeave"
      >
        <span
          class="thumb"
          :style="{
            boxShadow: computedThumbHalo,
            background: computedThumbColor,
            ...computedThumbSize,
          }"
        ></span>
        <ValueLabel
          :active="computedValueLabelVisibility"
          :value="'40'"
          :color="computedValueLabelColor"
        ></ValueLabel>
      </div>
      <span class="rail" :style="{ background: computedBaselineColor }"></span>
      <span
        class="track"
        :style="{
          background: computedBaselineColor,
          width: computedTrackLength,
        }"
      ></span>
      <Mark
        :index="idx"
        :color="computedMarkColor"
        :ranged="calcWhetherMarkRanged(idx, mark.position)"
        :vertical="vertical"
        :position="mark.position || (1 / step) * idx"
        :label="mark.label"
        v-for="(mark, idx) in computedMarks"
        :key="idx"
      ></Mark>
    </div>
    <span class="dev-info" v-if="dev">{{ progressText }} {{ isDragging }}</span>
  </section>
</template>
<script>
import { requireOneOf } from "../common/validator";
import Mark from "./_Mark.vue";
import ValueLabel from "./_ValueLabel.vue";
const DefaultColorSet = [25, 118, 210, 1];
export default {
  name: "Slider",
  components: { Mark, ValueLabel },
  props: {
    size: {
      //the length of slider
      //prop controlled only, outer controller not supported
      type: Number,
      default: 120,
    },
    //todo height
    disabled: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    dev: {
      type: Boolean,
      default: false,
    },
    backgroundDisplayed: {
      type: Boolean,
      default: false,
    },
    valueLabelDisplay: {
      /* 
    1.auto: visible when dragging or hovering;
    2.on: always visible
    3.off: never visible
    */
      default: "auto",
      validator: (v) => {
        return [requireOneOf(["auto", "on", "off"])].some((test) => test(v));
      },
    },
    defaultValue: {
      //progress*100=defaultValue [0,100]
      type: Number,
      default: 0,
    },
    /* 
    1.step and default marks: each step will be marked and valueLabeled;
    2.step and custom marks: only the positions of custom marks will be marked 
    while all the available positions will be valueLabeled;
    3.no step and custom marks: only the positions of custom marks will be marked and valueLabeled
    4.no step and default marks: invalid
    */
    step: {
      //discrete controller, the number of steps
      type: Number,
      required: false,
    },
    marks: {
      //generate a mark for each step
      type: Boolean,
      required: false,
    },
    /* the following are the user custom props */
    color: {
      //theme color
      type: String,
      required: false,
    },
    baselineColor: {
      type: String,
      required: false,
    },
    thumbColor: {
      type: String,
      required: false,
    },
    thumbHaloColor: {
      //a halo appears when hovering or dragging
      type: String,
      required: false,
    },
    markColor: {
      //mark unranged color
      type: String,
      required: false,
    },
    valueLabelColor: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isHovering: false,
      isDragging: false,
      progress: this.clamp(parseInt(this.defaultValue), 0, 100) / 100,
      throttleTimer: null,
    };
  },
  computed: {
    classes() {
      return [this.disabled ? "disabled" : ""];
    },
    computedThickness() {
      //height and padding decide the thickness(horizontally height) of the component together
      //the height of 2px is the slim slider bar itselt
      //the padding is the occupied space
      if (!this.vertical)
        return {
          height: "2px",
          padding: "13px 0",
        };
      else
        return {
          width: "2px",
          padding: "0 13px",
        };
    },
    computedLength() {
      //horizontally width
      if (!this.vertical) return { width: `${this.size}px` };
      else return { height: `${this.size}px` };
    },
    calcDetectionLength() {
      return this.size + 14;
    },
    computedDetectionArea() {
      //14px larger than the main thickness and length
      //thickness 28px
      if (!this.vertical)
        return {
          width: `${this.size + 14}px`,
          height: "42px",
        };
      else
        return {
          width: "42px",
          height: `${this.size + 14}px`,
        };
    },
    computedThumbArea() {
      if (!this.vertical)
        return {
          width: "28px",
          height: "100%",
        };
      else
        return {
          width: "100%",
          height: "28px",
        };
    },
    computedThumbSize() {
      if (this.disabled)
        return {
          width: "8px",
          height: "8px",
          marginLeft: "-3px",
          marginTop: "-3px",
        };
      return {
        width: "12px",
        height: "12px",
        marginLeft: "-5px",
        marginTop: "-5px",
      };
    },
    calcThumbAreaSize() {
      return 28;
    },
    computedMainColor() {
      return this.color || this.parseColor(DefaultColorSet);
    },
    computedThumbColor() {
      if (this.disabled) return "rgba(189,189,189,1)";
      return this.thumbColor || this.computedMainColor;
    },
    computedMarkColor() {
      if (this.disabled) return "rgba(189,189,189,1)";
      return this.markColor || this.computedMainColor;
    },
    computedValueLabelColor() {
      if (this.disabled) return "rgba(189,189,189,1)";
      return this.valueLabelColor || this.computedMainColor;
    },
    computedBackgroundColor() {
      if (this.backgroundDisplayed)
        return this.disabled
          ? "rgba(189,189,189,0.04)"
          : this.parseColor(DefaultColorSet, 0.04);
      else return null;
    },
    computedBaselineColor() {
      if (this.disabled) return "rgba(189,189,189,1)";
      return this.baselineColor || this.computedMainColor;
    },
    computedThumbPositionLeft() {
      return `${this.progress * this.calcDetectionLength -
        this.calcThumbAreaSize / 2}px`;
    },
    computedTrackLength() {
      return `${this.progress * 100}%`;
    },
    computedThumbHalo() {
      if (this.isDragging)
        return `0px 0px 0px 14px ${this.thumbHaloColor ||
          this.parseColor(DefaultColorSet, 0.16)}`;
      else if (this.isHovering)
        return `0px 0px 0px 8px ${this.thumbHaloColor ||
          this.parseColor(DefaultColorSet, 0.16)}`;
      return null;
    },
    computedMarks() {
      //n steps, n+1 marks
      if (this.step && this.marks)
        return new Array(this.calcStepNumber + 1).fill({});
      else return [];
    },
    computedValueLabelVisibility() {
      if (this.valueLabelDisplay === "on") return true;
      else if (this.valueLabelDisplay === "off") return false;
      else return this.isHovering || this.isDragging;
    },
    calcStepNumber() {
      if (!this.step) return 0;
      //todo int guarantee
      return this.clamp(parseInt(this.step), 0, 100);
    },
    progressText() {
      return `${Math.round(this.progress * 100)}%`;
    },
  },
  mounted() {
    document.addEventListener("mouseup", this.handleStopDrag, false);
    document.addEventListener("mousemove", this.handleMove, false);
    // document.onmousemove=this.handleMove
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.handleStopDrag);
    document.removeEventListener("mousemove", this.handleMove);
  },
  methods: {
    initLength() {},
    handleHoverEnter() {
      if (this.disabled) return;
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (this.disabled) return;
      this.isHovering = false;
    },
    handleStartDrag(e) {
      if (this.disabled) return;
      this.isDragging = true;
      let elBCR = e.currentTarget.getBoundingClientRect();
      this.updatePositionByClick(e.clientX, e.clientY, elBCR.left, elBCR.top);
    },
    handleStopDrag() {
      if (this.disabled) return;
      this.isDragging = false;
    },
    calcWhetherMarkRanged(index, position) {
      //todo abnormally execution after updatePositionByClick
      //todo precision problem 0.1+0.2 -> 0.3000000001
      return position
        ? this.progress >= position
        : this.progress >= this._.floor((1 / this.step) * index, 6);
    },
    update(value) {
      this.progress = this._.round(this.clamp(value, 0, 1), 2);
      // console.log("update", value, this.progress);
      this.$emit("change", this.progress);
    },

    handleMove(e) {
      if (this.disabled || !this.isDragging || this.throttleTimer) return;
      this.throttleTimer = setTimeout(() => {
        this.throttleTimer = null;
        //throttle
        let elBCR = this.$el
          .querySelector(".detection-area")
          .getBoundingClientRect();
        this.updatePositionByDragging(
          e.clientX,
          e.clientY,
          elBCR.left,
          elBCR.top
        );
      }, 25);
    },
    updatePositionByDragging(cursorX, cursorY, sliderX, sliderY) {
      // console.log("updatePositionByDragging", cursorX, sliderX, cursorY, sliderY);
      let progress = this.vertical
        ? (cursorY - sliderY) / this.calcDetectionLength
        : (cursorX - sliderX) / this.calcDetectionLength;

      //discrete
      if (this.calcStepNumber)
        this.update(this.findNearestValue(progress, this.calcStepNumber));
      //continuous
      else this.update(progress);
    },
    updatePositionByClick(cursorX, cursorY, sliderX, sliderY) {
      // console.log("updatePositionByClick", cursorX, sliderX, cursorY, sliderY);
      let progress = this.vertical
        ? (cursorY - sliderY) / this.calcDetectionLength
        : (cursorX - sliderX) / this.calcDetectionLength;

      //discrete
      if (this.calcStepNumber)
        this.update(this.findNearestValue(progress, this.calcStepNumber));
      //continuous
      else this.update(progress);
    },
    findNearestValue(percentage, step) {
      // (percentage*100)/(100/step)=percentage*step
      // console.log("findNearestValue", Math.round(percentage * step));
      return Math.round(percentage * step) / step;
    },
    clamp(number, min, max) {
      if (number < min) {
        return min;
      } else if (number > max) {
        return max;
      } else {
        return number;
      }
    },
    parseColor(inputColorArray, alpha) {
      let arr = [...inputColorArray];
      if (alpha) arr[3] = alpha;
      return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`;
    },
  },
};
</script>
<style lang="less" scoped>
.slider {
  display: flex;
  position: relative;
  box-sizing: content-box;
  user-select: none;
  cursor: pointer;
  touch-action: none;
  &.disabled {
    cursor: default;
  }
  .detection-area {
    position: absolute;
    //14px larger than the main thickness and length
    left: -7px;
    top: -7px;
    z-index: 10;
    .baseline {
      z-index: -10;
      position: absolute;
      top: 50%;
      height: 2px;
    }
    .rail {
      .baseline();
      opacity: 0.38;
      width: 100%;
    }
    .track {
      .baseline();
      transition: width 50ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
    .thumb-wrapper {
      position: absolute;
      // background: rgba(0, 0, 0, 0.4);
      //TIP: if you want a circle to grow into a halo, use box-shadow
      /*       use mouseenter instead
      &:hover .thumb {
        box-shadow: 0px 0px 0px 8px rgba(25, 118, 210, 0.16);
      } */
      transition: left 50ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      .thumb {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        opacity: 1;
        transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        z-index: 20;
      }
    }
  }

  .dev-info {
    position: absolute;
    line-height: 28px;
    top: 0;
    left: 134px;
    user-select: none;
  }
}
</style>
