<template>
  <section class="switch-example">
    <typography variant="h1">Switch</typography>
    <typography variant="p" :classes="['description']"
      >Switches toggle the state of a single setting on or off.</typography
    >
    <typography variant="quote">
      Switches are the preferred way to adjust settings on mobile. The option
      that the switch controls, as well as the state it's in, should be made
      clear from the corresponding inline label.</typography
    >
    <typography variant="h2" id="ac-basic-switch">Basic switch</typography>
    <GroupBox> <Vswitch></Vswitch></GroupBox>

    <typography variant="h2" id="ac-label">Label</typography>
    <typography variant="p"
      >You can provide a label using the prop <code>label</code></typography
    >
    <GroupBox> <Vswitch></Vswitch></GroupBox>

    <typography variant="h2" id="ac-size">Size</typography>
    <typography variant="p"
      >You can change the size of the switch using the prop
      <code>size</code></typography
    >
    <GroupBox> <Vswitch></Vswitch></GroupBox>

    <typography variant="h2" id="ac-color">Color</typography>
    <typography variant="p"
      >You can change the size of the switch using the prop
      <code>color</code></typography
    >
    <GroupBox> <Vswitch></Vswitch></GroupBox>

    <typography variant="h2" id="ac-controlled">Controlled</typography>
    <Typography type="p">
      You can control the switch with the <code>checked</code> and
      <code>onChange</code> props.
    </Typography>
    <GroupBox> <Vswitch></Vswitch></GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
import Vswitch from "../components/Switch/Switch.vue";
import Typography from "../components/Typography/Typography";

export default {
  name: "SwitchExample",
  components: { Typography, Vswitch, GroupBox },
  anchors: [
    { anchor: "ac-basic-switch", text: "Basic switch" },
    { anchor: "ac-label", text: "Label" },
    { anchor: "ac-size", text: "Size" },
    { anchor: "ac-color", text: "Color" },
    { anchor: "ac-controlled", text: "Controlled" },
  ],
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.switch-example {
}
</style>
