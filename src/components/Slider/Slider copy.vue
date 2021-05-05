<template>
  <section class="slider">
    <div
      class="detection-area"
      :style="styleDetection"
      @click="onSelect"
      @mousemove="onMove"
      @mouseleave="onLeave"
      @mousedown="onActivate"
      @mouseenter="onEnter"
    >
      <span
        class="thumb"
        :class="isDragging ? 'active' : ''"
        :style="styleThumb"
      ></span>
      <span class="rail"></span>
      <span class="track" :style="styleTrack"></span>
    </div>

    <span class="text">{{ progressText }}</span>
  </section>
</template>
<script>
export default {
  name: "Slider",
  components: {},
  props: {
    isShowDetectionArea: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sliderWidth: 120,
      thumbWidth: 12,
      isDragging: false,
      isActivated: false,
      progress: 0,
      apiWhenUpdate: "change", //change should be implemented in its father
    };
  },
  computed: {
    styleThumb() {
      return {
        left: String(this.progress * 100) + "%",
      };
    },
    styleTrack() {
      return {
        width: String(this.progress * 100) + "%",
      };
    },
    styleDetection() {
      return {
        backgroundColor: this.isShowDetectionArea ? "#1976d20a" : "transparent",
      };
    },
    progressText() {
      return String(Math.round(this.progress * 100)) + "%";
    },
  },
  mounted() {
    window.addEventListener(
      "mouseup",
      (e) => {
        this.onStop(e);
      },
      false
    );
  },
  methods: {
    update(value) {
      console.log("update", value);
      this.progress = this._.round(this.clamp(value, 0, 1), 2);
      this.$emit(this.apiWhenUpdate, this.progress);
    },
    onActivate() {
      if (!this.isActivated) {
        console.log("onActivate");
        this.isActivated = true;
        this.isDragging = true;
      }
    },
    onStop() {
      //console.log("onStop");
      this.isActivated = false;
      this.isDragging = false;
    },
    onMove(e) {
      if (this.isActivated) {
        //e.currentTarget -> event binding dom
        //e.target -> event triggering dom
        //dont not use e.offsetX cuz it may be from child el

        let newProgress =
          (e.pageX -
            e.currentTarget.getBoundingClientRect().left -
            this.thumbWidth / 2) /
          this.sliderWidth;
        this.update(newProgress);
      }
    },
    onSelect(e) {
      let newProgress =
        (e.pageX -
          e.currentTarget.getBoundingClientRect().left -
          this.thumbWidth / 2) /
        this.sliderWidth;
      this.update(newProgress);
      console.log("onSelect", e.target, e.currentTarget, newProgress);
    },
    onLeave() {
      if (this.isActivated) {
        this.isActivated = false;
      }
    },
    onEnter() {
      if (this.isDragging) {
        this.isActivated = true;
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
  color: #1976d2;
  user-select: none;
  width: 120px;
  cursor: pointer;
  height: 2px;
  display: inline-block;
  padding: 13px 0;
  margin: 10px 50px;
  position: relative;
  box-sizing: content-box;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  .detection-area {
    position: absolute;
    width: 134px;
    height: 42px;
    left: -7px;
    top: -7px;
    z-index: 10;
  }
  .rail {
    z-index: -10;
    position: absolute;
    background-color: #1976d2;
    width: 100%;
    height: 2px;
    top: 21px;
    opacity: 0.38;
  }
  .track {
    z-index: -10;
    position: absolute;
    background-color: #1976d2;
    top: 21px;
    height: 2px;
  }
  .thumb {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 21px;
    margin-top: -5px;
    margin-left: -6px;
    border-radius: 50%;
    background-color: #1976d2;
    opacity: 1;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  .thumb:hover {
    box-shadow: 0px 0px 0px 8px #1976d229;
  }
  .thumb.active {
    box-shadow: 0px 0px 0px 14px #1976d229;
  }
  .text {
    position: absolute;
    line-height: 28px;
    top: 0;
    left: 134px;
    user-select: none;
  }
}
</style>