<template>
  <section class="float-action-button-example">
    <typography variant="h1"> Floating action button</typography>
    <typography variant="p" :classes="['description']"
      >A floating action button (FAB) performs the primary, or most common,
      action on a screen.</typography
    >
    <typography variant="h2">Floating Action Button</typography>
    <typography variant="p"
      >A floating action button appears in front of all screen content,
      typically as a circular shape with an icon in its center. FABs come in two
      types: regular, and extended.</typography
    >
    <typography variant="p"
      >Only use a FAB if it is the most suitable way to present a screen’s
      primary action.</typography
    >
    <typography variant="p"
      >Only one floating action button is recommended per screen to represent
      the most common action.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <float-action-button icon="add" color="primary"></float-action-button>
      <float-action-button icon="edit" color="secondary"></float-action-button>
      <float-action-button
        icon="compass"
        color="default"
        variant="extended"
        text="Navigate"
      ></float-action-button>
      <float-action-button icon="favorite" disabled></float-action-button>
    </section>
    <typography variant="h2">Size</typography>
    <typography variant="p"
      >Use the <code>size</code> prop for larger or smaller floating action
      buttons.</typography
    >
    <section class="group-box box-block center margin-8 bd-1 br-4">
      <section class="row ai-center margin-8">
        <float-action-button
          icon="add"
          color="secondary"
          size="sm"
        ></float-action-button>
        <float-action-button
          icon="add"
          color="secondary"
          size="md"
        ></float-action-button>
        <float-action-button
          icon="add"
          color="secondary"
          size="lg"
        ></float-action-button>
      </section>
      <section class="row ai-center margin-8">
        <float-action-button
          icon="compass"
          color="primary"
          variant="extended"
          size="sm"
          text="Navigate"
        ></float-action-button>
        <float-action-button
          icon="compass"
          color="primary"
          variant="extended"
          size="md"
          text="Navigate"
        ></float-action-button>
        <float-action-button
          icon="compass"
          color="primary"
          variant="extended"
          size="lg"
          text="Navigate"
        ></float-action-button>
      </section>
    </section>
  </section>
</template>
<script>
import FloatActionButton from "../components/Button/FloatActionButton";
// import Vbutton from "../components/Button/Button";
import Typography from "../components/Typography/Typography";
export default {
  name: "FloatActionButtonExample",
  components: { FloatActionButton, Typography },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.float-action-button-example {
  .quote {
    margin: 24px 0;
    padding: 4px 24px;
    border-left: 5px solid #ffe564;
    background-color: rgba(255, 229, 100, 0.2);
    p {
      margin-top: 16px;
    }
  }

  .group-box {
    display: flex;
    position: relative;
    padding: 24px;
    p {
      margin: 8px 0;
    }
  }
  .box-block {
    flex-direction: column;
    .row {
      display: flex;
      background: #fff;
      padding: 24px;
      flex-wrap: wrap;
      &.center {
        justify-content: center;
        align-items: center;
      }
      &.jc-center{
        justify-content: center;
      }
      &.ai-center{
        align-items: center;
      }
    }
  }
  .box-inline {
    flex-direction: row;
    flex-wrap: wrap;
    &.center {
      justify-content: center;
    }
    .col {
      display: flex;
      background: #fff;
      padding: 24px;
      justify-content: center;
    }
  }
}
</style>
