<template>
  <section class="button-example">
    <typography variant="h1">Button</typography>
    <typography variant="p" :classes="['description']"
      >Buttons allow users to take actions, and make choices, with a single
      tap.</typography
    >
    <ul>
      <li>
        Dialogs
      </li>
      <li>
        Modal windows
      </li>
      <li>
        Forms
      </li>
      <li>
        Cards
      </li>
      <li>
        Toolbars
      </li>
    </ul>
    <typography variant="h2" id="ac-contained">Contained buttons</typography>
    <typography variant="p"
      >Contained buttons are high-emphasis, distinguished by their use of
      elevation and fill. They contain actions that are primary to your
      app.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vbutton color="default" variant="contained">primary</vbutton>
      <vbutton color="primary" variant="contained">primary</vbutton>
      <vbutton color="secondary" variant="contained">secondary</vbutton>
      <vbutton disabled>disabled</vbutton>
    </section>
    <typography variant="p"
      >You can remove the elevation with the <code>flat</code> prop.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vbutton color="primary" flat>flat</vbutton>
    </section>
    <typography variant="h2" id="ac-text">Text buttons</typography>
    <typography variant="p"
      >Text buttons are typically used for less-pronounced actions, including
      those located:</typography
    >
    <ul>
      <li>
        Dialogs
      </li>

      <li>
        Cards
      </li>
    </ul>
    <typography variant="p"
      >In cards, text buttons help maintain an emphasis on card
      content.</typography
    >

    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vbutton variant="text" color="default">default</vbutton>
      <vbutton variant="text" color="primary">primary</vbutton>
      <vbutton variant="text" color="secondary">secondary</vbutton>
      <vbutton variant="text" disabled>disabled</vbutton>
    </section>
    <typography variant="h2" id="ac-outlined">Outlined buttons</typography>
    <typography variant="p"
      >Outlined buttons are medium-emphasis buttons. They contain actions that
      are important but aren't the primary action in an app.</typography
    >
    <typography variant="p"
      >Outlined buttons are also a lower emphasis alternative to contained
      buttons, or a higher emphasis alternative to text buttons.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vbutton variant="outlined" color="default">default</vbutton>
      <vbutton variant="outlined" color="primary">primary</vbutton>
      <vbutton variant="outlined" color="secondary">secondary</vbutton>
      <vbutton variant="outlined" disabled>disabled</vbutton>
    </section>
    <typography variant="h2" id="ac-sizes">Sizes</typography>
    <typography variant="p"
      >By default the size is medium with the specific padding and height. To
      use the <code>size</code> prop is to provide the preset paddings and
      heights.</typography
    >
    <section class="group-box box-block bd-1 br-4 padding-4">
      <section class="row margin-8">
        <vbutton variant="text" color="primary" size="sm">SMALL</vbutton>
        <vbutton variant="text" color="primary" size="md">MEDIUM</vbutton>
        <vbutton variant="text" color="primary" size="lg">LARGE</vbutton>
      </section>
      <section class="row margin-8">
        <vbutton variant="outlined" color="primary" size="sm">SMALL</vbutton>
        <vbutton variant="outlined" color="primary" size="md">MEDIUM</vbutton>
        <vbutton variant="outlined" color="primary" size="lg">LARGE</vbutton>
      </section>
      <section class="row margin-8">
        <vbutton variant="contained" color="primary" size="sm">SMALL</vbutton>
        <vbutton variant="contained" color="primary" size="md">MEDIUM</vbutton>
        <vbutton variant="contained" color="primary" size="lg">LARGE</vbutton>
      </section>
    </section>
    <typography variant="p"
      >It is recommended to costomize your own padding, width, height, fon-size and so
      on in the style of <code>.btn</code>.</typography
    >
    <section class="group-box box-block bd-1 br-4 padding-4">
      <section class="row margin-8">
        <vbutton class="custom" variant="contained" color="primary" size="sm">CUSTOM</vbutton>
      </section>
    </section>
  </section>
</template>
<script>
import Vbutton from "../components/Button/Button";
import Typography from "../components/Typography/Typography";
export default {
  name: "ButtonExample",
  components: { Typography, Vbutton },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.button-example {
  .custom{
    width:240px;
    height:48px;
    padding:14px 18px;
    font-size: 16px;
  }
}
</style>
