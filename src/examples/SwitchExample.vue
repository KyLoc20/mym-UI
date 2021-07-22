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
    <GroupBox>
      <Vswitch></Vswitch>
      <Vswitch checked></Vswitch>
      <Vswitch checked disabled></Vswitch>
      <Vswitch disabled></Vswitch
    ></GroupBox>

    <typography variant="h2" id="ac-label">Label</typography>
    <typography variant="p"
      >You can provide a label using the prop <code>label</code>.</typography
    >
    <GroupBox block>
      <GroupRow
        ><span class="wrapper"><Vswitch label="Label" checked></Vswitch></span
      ></GroupRow>
      <GroupRow
        ><span class="wrapper"
          ><Vswitch label="Disabled" disabled></Vswitch></span></GroupRow
    ></GroupBox>

    <typography variant="h2" id="ac-size">Size</typography>
    <typography variant="p"
      >You can change the size of the switch using the prop
      <code>size</code>.</typography
    >
    <GroupBox>
      <Vswitch size="sm"></Vswitch>
      <Vswitch size="md"></Vswitch>
      <Vswitch size="lg"></Vswitch
    ></GroupBox>

    <typography variant="h2" id="ac-color">Color</typography>
    <typography variant="p"
      >You can change the size of the switch using the prop
      <code>color</code>.</typography
    >
    <GroupBox>
      <Vswitch checked></Vswitch>
      <Vswitch color="secondary" checked></Vswitch
    ></GroupBox>
    <typography variant="p"
      >To custom the details, the component accepts the following options
      structures as the prop <code>colorOptions</code>.</typography
    >
    <typography variant="pre">[{label: String}]</typography>

    <typography variant="h2" id="ac-controlled">Controlled</typography>
    <typography variant="p">
      You can control the switch with the <code>checked</code> and
      <code>onChange</code> props.
    </typography>
    <GroupBox>
      <span class="wrapper">
        <Vswitch
          :label="controlledValue ? 'Checked' : 'Unchecked'"
          :checked="controlledValue"
          @change="handleCheck"
        ></Vswitch
      ></span>
    </GroupBox>

    <typography variant="h2" id="ac-label-placement">
      Label placement
    </typography>
    <typography variant="p">
      You can change the placement of the label with the prop
      <code>labelPlacement</code>.
    </typography>
    <GroupBox>
      <Vswitch labelPlacement="top" label="Top"></Vswitch>
      <Vswitch labelPlacement="left" label="Left"></Vswitch>
      <Vswitch labelPlacement="bottom" label="Bottom"></Vswitch>
      <Vswitch labelPlacement="right" label="Right"></Vswitch>
    </GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
import GroupRow from "../components/Layout/GroupRow.vue";
import Vswitch from "../components/Switch/Switch.vue";
import Typography from "../components/Typography/Typography";

export default {
  name: "SwitchExample",
  components: { Typography, Vswitch, GroupBox, GroupRow },
  anchors: [
    { anchor: "ac-basic-switch", text: "Basic switch" },
    { anchor: "ac-label", text: "Label" },
    { anchor: "ac-size", text: "Size" },
    { anchor: "ac-color", text: "Color" },
    { anchor: "ac-controlled", text: "Controlled" },
  ],
  data() {
    return {
      controlledValue: true,
    };
  },
  methods: {
    handleCheck(e) {
      this.controlledValue = e.value;
    },
  },
  computed: {},
};
</script>
<style scoped lang="less">
.switch-example {
  .wrapper {
    display: flex;
    min-width: 150px;
  }
}
</style>
