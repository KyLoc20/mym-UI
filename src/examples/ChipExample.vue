<template>
  <section class="chip-example">
    <typography variant="h1">Chip</typography>
    <typography variant="p" :classes="['description']"
      >Chips are compact elements that represent an input, attribute, or
      action.</typography
    >
    <typography variant="p"
      >Chips allow users to enter information, make selections, filter content,
      or trigger actions.</typography
    >
    <typography variant="h2">Basic chip</typography>
    <typography variant="p"
      >The <code>Chip</code> component supports outlined and filled
      styling.</typography
    >

    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <chip variant="filled" color="default" text="Chip Filled"></chip>
      <chip variant="outlined" color="default" text="Chip Outlined"></chip>
    </section>

    <typography variant="h2">Chip actions </typography>
    <typography variant="p">You can use the following actions.</typography>
    <ul>
      <li>
        Chips with the <code>clickable</code> prop defined change appearance on
        hover, and click.
      </li>
      <li>
        Chips with the <code>removable</code> prop defined will display a delete
        icon which changes appearance on hover.
      </li>
      <li>
        Chips with the <code>selectable</code> prop defined will display a check
        icon which changes appearance on hover.
      </li>
    </ul>

    <typography variant="h3">Clickable</typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <chip variant="filled" color="default" text="Clickable" clickable></chip>
      <chip
        variant="outlined"
        color="default"
        text="Clickable"
        clickable
      ></chip>
    </section>

    <typography variant="h3">Deleteable</typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <chip
        variant="filled"
        color="default"
        text="Deleteable"
        deleteable
      ></chip>
      <chip
        variant="outlined"
        color="default"
        text="Deleteable"
        deleteable
      ></chip>
    </section>
    <typography variant="h3">Selectable</typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <chip
        variant="filled"
        color="default"
        text="Selectable"
        selectable
      ></chip>
      <chip
        variant="outlined"
        color="default"
        text="Selectable"
        selectable
      ></chip>
      <chip
        variant="filled"
        color="default"
        text="Selectable"
        selectable
        selected
      ></chip>
      <chip
        variant="outlined"
        color="default"
        text="Selectable"
        selectable
        selected
      ></chip>
    </section>

    <typography variant="h3">Color Chip</typography>
    <typography variant="p"
      >You can use the <code>color</code> prop to define a primary or secondary
      color style.</typography
    >
    <section class="group-box box-block center bd-1 br-4">
      <section class="row margin-8">
        <chip variant="filled" color="primary" text="Primary Filled"></chip>
        <chip variant="outlined" color="primary" text="Primary Outlined"></chip>
        <chip variant="filled" color="secondary" text="Secondary Filled"></chip>
        <chip
          variant="outlined"
          color="secondary"
          text="Secondary Outlined"
        ></chip>
      </section>
      <section class="row margin-8">
        <chip variant="filled" color="primary" text="Clickable" clickable
          >clickable</chip
        >
        <chip
          variant="outlined"
          color="primary"
          text="Clickable"
          clickable
        ></chip>
        <chip variant="filled" color="secondary" text="Clickable" clickable
          >clickable</chip
        >
        <chip
          variant="outlined"
          color="secondary"
          text="Clickable"
          clickable
        ></chip>
      </section>
      <section class="row margin-8">
        <chip
          variant="filled"
          color="primary"
          text="Deleteable"
          deleteable
        ></chip>
        <chip
          variant="outlined"
          color="primary"
          text="Deleteable"
          deleteable
        ></chip>
        <chip
          variant="filled"
          color="secondary"
          text="Deleteable"
          deleteable
        ></chip>
        <chip
          variant="outlined"
          color="secondary"
          text="Deleteable"
          deleteable
        ></chip>
      </section>
      <section class="row margin-8 ">
        <chip
          variant="filled"
          color="primary"
          text="Selectable"
          selectable
        ></chip>
        <chip
          variant="outlined"
          color="primary"
          text="Selectable"
          selectable
          selected
        ></chip>
        <chip
          variant="filled"
          color="secondary"
          text="Selectable"
          selectable
        ></chip>
        <chip
          variant="outlined"
          color="secondary"
          text="Selectable"
          selectable
          selected
        ></chip>
      </section>
      <section class="row  margin-8"></section>
    </section>

    <typography variant="h2">Chip adornments</typography>
    <typography variant="p"
      >You can add ornaments to the beginning of the component.</typography
    >
    <typography variant="p"
      >Use the <code>icon</code> prop to added a icon.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <chip
        icon="face"
        variant="filled"
        color="default"
        text="With Icon"
        clickable
      ></chip>
      <chip
        icon="face"
        variant="outlined"
        color="default"
        text="With Icon"
        clickable
      ></chip>
      <chip
        icon="face"
        variant="filled"
        color="primary"
        text="With Icon"
        clickable
      ></chip>
      <chip
        icon="face"
        variant="outlined"
        color="primary"
        text="With Icon"
        clickable
      ></chip>
      <chip
        icon="face"
        variant="filled"
        color="secondary"
        text="With Icon"
        clickable
      ></chip>
      <chip
        icon="face"
        variant="outlined"
        color="secondary"
        text="With Icon"
        clickable
      ></chip>
    </section>
  </section>
</template>
<script>
import Chip from "../components/Chip/Chip";
import Typography from "../components/Typography/Typography";
export default {
  name: "ChipExample",
  components: { Typography, Chip },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.chip-example {
}
</style>
