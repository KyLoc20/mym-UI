<template>
  <section class="slider">
    <div
      class="detection-area"
      :style="{ background: computedBackgroundColor }"
      @mousedown="handleStartDrag"
    >
      <div
        class="thumb-wrapper"
        :style="{ left: computedThumbPositionLeft }"
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
      sliderLength: 134,
      thumbWrapperWidth: 28,
      progress: 0,
      throttleTimer: null,
    };
  },
  computed: {
    computedBackgroundColor() {
      if (this.backgroundDisplayed) return "rgba(25, 118, 210, 0.04)";
      else return null;
    },
    computedBaselineColor() {
      return this.baselineColor || "rgba(25, 118, 210, 1)";
    },
    computedThumbPositionLeft() {
      return `${this.progress * this.sliderLength -
        this.thumbWrapperWidth / 2}px`;
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
      // console.log("updatePositionByClick", cursorX, sliderX, cursorY, sliderY);
      this.update((cursorX - sliderX) / this.sliderLength);
      if (!this.vertical) {
        this.update((cursorX - sliderX) / this.sliderLength);
      } else {
        this.update((cursorY - sliderY) / this.sliderLength);
      }
    },
    updatePositionByClick(cursorX, cursorY, sliderX, sliderY) {
      // console.log("updatePositionByClick", cursorX, sliderX, cursorY, sliderY);
      if (!this.vertical) {
        this.update((cursorX - sliderX) / this.sliderLength);
      } else {
        this.update((cursorY - sliderY) / this.sliderLength);
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
.baseline {
  z-index: -10;
  position: absolute;
  top: 50%;
  height: 2px;
}
.slider {
  display: flex;
  color: #1976d2;
  user-select: none;
  width: 120px;
  cursor: pointer;
  height: 2px;
  padding: 13px 0;
  margin: 10px 50px;
  position: relative;
  box-sizing: content-box;
  touch-action: none;
  .detection-area {
    position: absolute;
    width: 134px;
    height: 42px;
    left: -7px;
    top: -7px;
    z-index: 10;
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
      width: 28px;
      height: 100%;
      // background: rgba(0, 0, 0, 0.4);
      //if you want a circle to grow into a halo, use box-shadow
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
