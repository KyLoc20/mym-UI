<template>
  <section class="slider-example">
    <typography variant="h1">Slider</typography>
    <typography variant="p" :classes="['description']"
      >Sliders allow users to make selections from a range of
      values.</typography
    >
    <typography variant="p"
      >Sliders reflect a range of values along a bar, from which users may
      select a single value. They are ideal for adjusting settings such as
      volume, brightness, or applying image filters.</typography
    >
    <typography variant="h2">Continuous sliders</typography>
    <typography variant="p"
      >Continuous sliders allow users to select a value along a subjective
      range.</typography
    >
    <GroupBox>
      <Slider></Slider>
    </GroupBox>

  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
// import GroupRow from "../components/Layout/GroupRow.vue";
import Slider from "../components/Slider/Slider";
import Typography from "../components/Typography/Typography";
export default {
  name: "SliderExample",
  components: { Typography, Slider, GroupBox,  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.slider-example {
  .custom {
    width: 240px;
    height: 48px;
    padding: 14px 18px;
    font-size: 16px;
  }
}
</style>
