<template>
  <section class="slider-example">
    <typography variant="h1">Slider</typography>
    <typography variant="p" :classes="['description']"
      >Sliders allow users to make selections from a range of
      values.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <Slider></Slider>
    </section>
    <GroupBox block
      ><GroupRow><Slider></Slider><Slider></Slider><Slider></Slider></GroupRow>
      <GroupRow><Slider></Slider><Slider></Slider><Slider></Slider></GroupRow>
    </GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
import GroupRow from "../components/Layout/GroupRow.vue";
import Slider from "../components/Slider/Slider";
import Typography from "../components/Typography/Typography";
export default {
  name: "SliderExample",
  components: { Typography, Slider, GroupBox, GroupRow },
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
