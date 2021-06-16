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
      <div class="wrapper"><Icon name="volumeDown" :style="{marginRight:'16px'}"></Icon> <Slider :defaultValue="30"></Slider><Icon name="volumeUp"  :style="{marginLeft:'16px'}"></Icon></div>
      
    </GroupBox>
    <typography variant="h2">Discrete sliders</typography>
    <typography variant="p"
      >Discrete sliders can be adjusted to a specific value by referencing its
      value indicator. By order of demos: You can generate a mark for each step
      with <code>marks={true}</code>.</typography
    >
    <GroupBox>
      <Slider :defaultValue="30" :step="10" marks></Slider>
    </GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
// import GroupRow from "../components/Layout/GroupRow.vue";
import Slider from "../components/Slider/Slider";
import Icon from "../components/Icon/Icon.vue"
import Typography from "../components/Typography/Typography";
export default {
  name: "SliderExample",
  components: { Typography, Slider, GroupBox ,Icon},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.slider-example {
  .wrapper{
    display: flex;
    margin-bottom: 8px;
  }
}
</style>
