<template>
  <section class="radio-example">
    <typography variant="h1">Radio</typography>
    <typography variant="p" :classes="['description']"
      >Radio buttons allow the user to select one option from a set.</typography
    >
    <typography variant="p"
      >Use radio buttons when the user needs to see all available options. If
      available options can be collapsed, consider using a dropdown menu because
      it uses less space.</typography
    >
    <typography variant="p"
      >Radio buttons should have the most commonly used option selected by
      default.
    </typography>

    <typography variant="h2">Radio group</typography>
    <typography variant="p"
      ><code>RadioGroup</code> is a helpful wrapper used to group
      <code>Radio</code> components that provides an easier API, and proper
      keyboard accessibility to the group.
    </typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <RadioGroup
        name="Gender"
        :items="radioItems"
        :defaultValue="defaultValue"
        @change="handleChangeRadioGroup"
      ></RadioGroup>
    </section>

    <typography variant="h2">Direction</typography>
    <typography variant="p"
      >To lay out the buttons horizontally, set the
      <code>horizontal</code> prop:
    </typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <RadioGroup
        name="Gender"
        horizontal
        :items="radioItems"
        :defaultValue="defaultValue"
        @change="handleChangeRadioGroup"
      ></RadioGroup>
    </section>

    <typography variant="h2">Standalone radio buttons</typography>
    <typography variant="p"
      ><code>Radio</code> can also be used standalone, without the RadioGroup
      wrapper.
    </typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <Radio label="a" :exclusive="false" checked></Radio>
      <Radio label="b" :exclusive="false"></Radio>
    </section>

    <typography variant="h2">Size</typography>
    <typography variant="p"
      >Use the <code>size</code> prop or customize the font size of the svg
      icons to change the size of the radios.
    </typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <Radio label="sm" :exclusive="false" size="sm" checked></Radio>
      <Radio label="md" :exclusive="false" size="md"></Radio>
      <Radio label="lg" :exclusive="false" size="lg"></Radio>
    </section>

    <typography variant="h2">Color</typography>
    <typography variant="p"
      >Use the <code>color</code> prop or customize the color of the radios.
    </typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <Radio
        label="secondary"
        :exclusive="false"
        checked
        color="secondary"
      ></Radio>
      <Radio label="primary" :exclusive="false" color="primary"></Radio>
      <Radio label="default" :exclusive="false" color="default"></Radio>
      <Radio label="green" :exclusive="false" color="green"></Radio>
    </section>

    <typography variant="h2">Label placement</typography>
    <typography variant="p"
      >You can change the placement of the label with the
      <code>label-placement</code> prop
    </typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <RadioGroup
        name="LabelPlacement"
        horizontal
        :items="radioItemsVariousPlacement"
        defaultValue="bottom"
        @change="handleChangeRadioGroup"
      ></RadioGroup>
    </section>
  </section>
</template>
<script>
import RadioGroup from "../components/Radio/RadioGroup";
import Radio from "../components/Radio/Radio";
import Typography from "../components/Typography/Typography";
export default {
  name: "RadioExample",
  components: { Typography, RadioGroup, Radio },
  data() {
    return {
      defaultValue: "female",
      cValue: this.defaultValue,
      radioItems: [
        { label: "female", text: "Female" },
        { label: "male", text: "Male" },
        { label: "other", text: "Other" },
        { label: "disabled", text: "Disabled Option", disabled: true },
      ],
      radioItemsVariousPlacement: [
        { label: "top", text: "Top", placement: "top" },
        { label: "left", text: "Left", placement: "left" },
        { label: "bottom", text: "Bottom", placement: "bottom" },
        { label: "right", text: "Right", placement: "right" },
      ],
    };
  },
  methods: {
    handleChangeRadioGroup(e) {
      this.cValue = e.label;
    },
  },
  computed: {},
};
</script>
<style scoped lang="less">
.radio-example {
  .custom {
    width: 240px;
    height: 48px;
    padding: 14px 18px;
    font-size: 16px;
  }
}
</style>
