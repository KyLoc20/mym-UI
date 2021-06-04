<template>
  <section class="checkbox-example">
    <typography variant="h1">Checkbox</typography>
    <typography variant="p" :classes="['description']"
      >Checkboxes can be used to turn an option on or off.</typography
    >
    <typography variant="p"
      >If you have multiple options appearing in a list, you can preserve space
      by using checkboxes instead of on/off switches. If you have a single
      option, avoid using a checkbox and use an on/off switch
      instead.</typography
    >

    <typography variant="h2" id="ac-basic-checkboxes">Basic checkboxes</typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <checkbox></checkbox>
      <checkbox checked></checkbox>
      <checkbox disabled></checkbox>
      <checkbox disabled checked></checkbox>
    </section>

    <typography variant="h2" id="ac-label">Label</typography>
    <typography variant="p"
      >You can add a description text to the
      <code>label</code> prop.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <checkbox label="Label"></checkbox>
      <checkbox disabled label="Disabled"></checkbox>
    </section>

    <typography variant="h2" id="ac-size">Size</typography>
    <typography variant="p"
      >Use the <code>size</code> prop or customize the width and the height in
      the css to change the size of the checkboxes.</typography
    >
    <typography variant="p"
      >Use the <code>iconSize</code> prop to change the size of the svg
      icons.</typography
    >
    <section class="group-box box-block center bd-1 br-4">
      <section class="row margin-8">
        <checkbox size="sm" iconSize="sm" label="Size-sm"></checkbox>
        <checkbox size="md" iconSize="md" label="Size-md"></checkbox>
        <checkbox size="lg" iconSize="lg" label="Size-lg"></checkbox>
      </section>
      <section class="row margin-8">
        <checkbox
          :size="30"
          :iconSize="12"
          label="Size-30-Iconsize-12"
        ></checkbox>
        <checkbox
          :size="34"
          :iconSize="16"
          label="Size-34-Iconsize-16"
        ></checkbox>
        <checkbox
          :size="50"
          :iconSize="32"
          label="Size-50-Iconsize-32"
        ></checkbox>
      </section>
    </section>

    <typography variant="h2" id="ac-color">Color</typography>
    <typography variant="p"
      >Use the <code>color</code> to change the color theme of the checkboxes
      including hover color, checked icon color and ripple color.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <checkbox checked color="default"></checkbox>
      <checkbox checked color="primary"></checkbox>
      <checkbox checked color="secondary"></checkbox>
    </section>

    <typography variant="quote">
      <typography variant="p"
        ><strong>Note: </strong>there is a default icon color when the
        checkboxes are not checked. Use the <code>iconUncheckedColor</code> prop
        to customize it.</typography
      >
    </typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <checkbox
        color="primary"
        iconUncheckedColor="rgba(25, 118, 210, 0.8)"
      ></checkbox>
      <checkbox
        color="secondary"
        iconUncheckedColor="rgba(220, 0, 78, 0.8)"
      ></checkbox>
    </section>

    <typography variant="h2" id="ac-controlled">Controlled</typography>
    <typography variant="p"
      >You can control the checkbox with the <code>checked</code> and
      <code>onChange</code> props.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <checkbox color="primary" checked @change="handleChangeCheckbox" :label="checkboxLabel"></checkbox>
    </section>
  </section>
</template>
<script>
import Checkbox from "../components/Checkbox/Checkbox";
import Typography from "../components/Typography/Typography";
export default {
  name: "CheckboxExample",
  components: { Typography, Checkbox },
    //for in-page navigation
  anchors: [
    { anchor: "ac-basic-checkboxes", text: "Basic checkboxes" },
    { anchor: "ac-label", text: "Label" },
    { anchor: "ac-size", text: "Size" },
    { anchor: "ac-color", text: "Color" },
    { anchor: "ac-controlled", text: "Controlled" },
  ],
  data() {
    return {
      checkboxLabel:"This one is Checked",
    };
  },
  methods: {
    handleChangeCheckbox(e){
      console.log('handleChangeCheckbox',e)
      if(e.value)this.checkboxLabel="This one is Checked"
      else this.checkboxLabel="This one is Unchecked"
    }
  },
  computed: {},
};
</script>
<style scoped lang="less">
.checkbox-example {
}
</style>
