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
    <GroupBox block>
      <GroupRow>
        <div class="wrapper">
          <Icon name="volumeDown" :style="{ marginRight: '16px' }"></Icon>
          <Slider :defaultValue="30"></Slider
          ><Icon name="volumeUp" :style="{ marginLeft: '16px' }"></Icon></div
      ></GroupRow>
      <GroupRow
        ><Slider :defaultValue="30" :size="200" disabled></Slider
      ></GroupRow>
    </GroupBox>
    <typography variant="h2">Size</typography>
    <typography variant="p"
      >Use the prop <code>size</code> to change the length of the
      slider.</typography
    >
    <GroupBox block>
      <GroupRow
        ><div class="wrapper" :style="{ width: '320px' }">
          <Slider :defaultValue="30" :size="120"></Slider></div
      ></GroupRow>
      <GroupRow
        ><div class="wrapper" :style="{ width: '320px' }">
          <Slider :defaultValue="30" :size="200"></Slider></div
      ></GroupRow>
      <GroupRow
        ><div class="wrapper" :style="{ width: '320px' }">
          <Slider :defaultValue="30" :size="300"></Slider></div
      ></GroupRow>
    </GroupBox>
    <typography variant="h2">Discrete sliders</typography>
    <typography variant="p"
      >Discrete sliders can be adjusted to a specific value by referencing its
      value indicator. By order of demos: You can generate a mark for each step
      with <code>marks={true}</code>.</typography
    >
    <GroupBox block>
      <GroupRow
        ><Slider :defaultValue="30" :size="300" :step="10" marks></Slider
      ></GroupRow>
      <GroupRow
        ><Slider
          :defaultValue="20"
          :size="300"
          :step="10"
          marks
          disabled
        ></Slider
      ></GroupRow>
    </GroupBox>
    <typography variant="h2">More steps</typography>
    <typography variant="p"
      >You can use the prop <code>step</code> to have custom number of
      steps.</typography
    >
    <GroupBox block>
      <GroupRow
        ><Slider :defaultValue="30" :size="300" :step="5" marks></Slider
      ></GroupRow>
      <GroupRow
        ><Slider :defaultValue="30" :size="300" :step="10" marks></Slider
      ></GroupRow>
      <GroupRow
        ><Slider :defaultValue="30" :size="300" :step="20" marks></Slider
      ></GroupRow>
    </GroupBox>
    <typography variant="h2">Value Label Visibility</typography>
    <typography variant="p"
      >You can keep the value label always visible with
      <code>valueLabelDisplay="on"</code></typography
    >
    <typography variant="p">
      You can keep the value label always invisible with
      <code>valueLabelDisplay="on"</code></typography
    >
    <typography variant="p">
      Otherwise let it display automatically with
      <code>valueLabelDisplay="auto"</code> by default.</typography
    >
    <GroupBox block>
      <GroupRow
        ><div class="wrapper" :style="{ marginTop: '12px' }">
          <Slider
            :defaultValue="30"
            :size="300"
            valueLabelDisplay="on"
          ></Slider>
        </div>
      </GroupRow>
      <GroupRow
        ><div class="wrapper">
          <Slider
            :defaultValue="30"
            :size="300"
            valueLabelDisplay="off"
          ></Slider>
        </div>
      </GroupRow>
      <GroupRow
        ><div class="wrapper" :style="{ marginTop: '12px' }">
          <Slider :defaultValue="30" :size="300"></Slider>
        </div>
      </GroupRow>
    </GroupBox>
    <typography variant="h2">Custom marks</typography>
    <typography variant="p"
      >You can have custom marks by providing a rich array to the
      <code>marks</code> prop.</typography
    >
    <GroupBox>
      <Slider :defaultValue="30" :size="500" :step="10" :marks="customMarks"></Slider>
    </GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
import GroupRow from "../components/Layout/GroupRow.vue";
import Slider from "../components/Slider/Slider";
import Icon from "../components/Icon/Icon.vue";
import Typography from "../components/Typography/Typography";
export default {
  name: "SliderExample",
  components: { Typography, Slider, GroupBox, GroupRow, Icon },
  data() {
    return {
      customMarks: [
        { progress: 0, label: "0°C" },
        { progress: 0.2, label: "20°C" },
        { progress: 0.37, label: "37°C" },
        { progress: 1, label: "100°C" },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.slider-example {
  .wrapper {
    display: flex;
    margin-bottom: 15px;
  }
}
</style>
