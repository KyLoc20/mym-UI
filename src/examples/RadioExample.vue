<template>
  <section class="slider-example">
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
      <Radio label="a" :exclusive="false"></Radio>
      <Radio label="b" :exclusive="false"></Radio>
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
.slider-example {
  .custom {
    width: 240px;
    height: 48px;
    padding: 14px 18px;
    font-size: 16px;
  }
}
</style>
