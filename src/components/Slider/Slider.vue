<template>
  <section class="slider" :style="{ ...computedLength, ...computedThickness }">
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
        <span class="thumb" :style="{ boxShadow: computedThumbHalo }"></span>
      </div>
      <span class="rail" :style="{ background: computedBaselineColor }"></span>
      <span
        class="track"
        :style="{
          background: computedBaselineColor,
          width: computedTrackLength,
        }"
      ></span>
    </div>
    <span class="dev-info" v-if="dev">{{ progressText }} {{ isDragging }}</span>
  </section>
</template>
<script>
export default {
  name: "Slider",
  components: {},
  props: {
    size: {
      //the length of slider
      //prop controlled only, outer controller not supported
      type: Number,
      default: 220,
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
    thumbHaloColor: {
      //a halo appears when hovering or dragging
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isHovering: false,
      isDragging: false,
      progress: 0,
      throttleTimer: null,
    };
  },
  computed: {
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
    calcDetectionLength(){
      return this.size+14
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
    calcThumbSize(){
      return 28
    },
    computedMainColor() {
      return this.color || "rgba(25, 118, 210, 1)";
    },
    computedBackgroundColor() {
      if (this.backgroundDisplayed) return "rgba(25, 118, 210, 0.04)";
      else return null;
    },
    computedBaselineColor() {
      return this.baselineColor || "rgba(25, 118, 210, 1)";
    },
    computedThumbPositionLeft() {
      return `${this.progress * this.calcDetectionLength -
        this.calcThumbSize / 2}px`;
    },
    computedTrackLength() {
      return `${this.progress * 100}%`;
    },
    computedThumbHalo() {
      if (this.isDragging)
        return `0px 0px 0px 14px ${this.thumbHaloColor ||
          "rgba(25, 118, 210, 0.16)"}`;
      else if (this.isHovering)
        return `0px 0px 0px 8px ${this.thumbHaloColor ||
          "rgba(25, 118, 210, 0.16)"}`;
      return null;
    },
    progressText() {
      return `${Math.round(this.progress * 100)}%`;
    },
  },
  mounted() {
    document.addEventListener("mouseup", this.handleStopDrag, false);
    document.addEventListener("mousemove", this.handleMove, false);
    // document.onmousemove=this.move
  },
  updated() {},
  beforeDestroy() {
    console.log("beforeDestroy");
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
      this.isDragging = true;
      let elBCR = e.currentTarget.getBoundingClientRect();
      this.updatePositionByClick(e.clientX, e.clientY, elBCR.left, elBCR.top);
    },
    handleStopDrag() {
      this.isDragging = false;
    },
    update(value) {
      this.progress = this._.round(this.clamp(value, 0, 1), 2);
      console.log("update", value, this.progress);
      this.$emit("change", this.progress);
    },

    handleMove(e) {
      if (!this.isDragging || this.throttleTimer) return;
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
      this.update((cursorX - sliderX) / this.calcDetectionLength);
      if (!this.vertical) {
        this.update((cursorX - sliderX) / this.calcDetectionLength);
      } else {
        this.update((cursorY - sliderY) / this.calcDetectionLength);
      }
    },
    updatePositionByClick(cursorX, cursorY, sliderX, sliderY) {
      // console.log("updatePositionByClick", cursorX, sliderX, cursorY, sliderY);
      if (!this.vertical) {
        this.update((cursorX - sliderX) / this.calcDetectionLength);
      } else {
        this.update((cursorY - sliderY) / this.calcDetectionLength);
      }
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
        width: 12px;
        height: 12px;
        top: 50%;
        left: 50%;
        margin-left: -6px;
        margin-top: -6px;
        border-radius: 50%;
        background: #1976d2;
        opacity: 1;
        transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
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
