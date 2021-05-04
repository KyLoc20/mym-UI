<template>
  <section class="stepper-example">
    <typography variant="h1">Stepper</typography>
    <typography variant="p" :classes="['description']"
      >Steppers convey progress through numbered steps. It provides a
      wizard-like workflow.</typography
    >
    <typography variant="p"
      >Steppers display progress through a sequence of logical and numbered
      steps. They may also be used for navigation. Steppers may display a
      transient feedback message after a step is saved.</typography
    >

    <ul>
      <li>
        <strong>Types of Steps:</strong> Editable, Non-editable, Mobile,
        Optional
      </li>
      <li>
        <strong>Types of Steppers:</strong> Horizontal, Vertical, Linear,
        Non-linear
      </li>
    </ul>
    <section class="quote">
      <typography variant="p">
        <strong>Note:</strong> Steppers are no longer documented in the Material
        Design guidelines, but Material-UI will continue to support
        them.</typography
      >
    </section>
    <typography variant="h2">Horizontal Stepper</typography>
    <typography variant="h3">Customized Stepper</typography>

    <typography variant="p"
      >Here is an example of customizing the component. You can learn more about
      this in the overrides documentation page.</typography
    >
    <section class="group-box box-block bg-gray padding-24">
      <section class="row">
        <stepper :steps="stepItems" :progress="progress"></stepper>
      </section>
      <section class="row">
        <stepper
          :steps="stepItems"
          :progress="progress"
          color="purple"
          simple
        ></stepper>
      </section>
      <section class="row">
        <stepper
          :steps="stepItemsWithIcons"
          :progress="progress"
          color="gradient"
          iconable
        ></stepper>
      </section>
      <p>{{ tips }}</p>
      <div class="margin-r8">
        <vbutton flat @click="handleBack" :disabled="progress === 0">{{
          progress === 3 ? "RESET" : "BACK"
        }}</vbutton>
        <vbutton color="primary" v-if="progress !== 3" @click="handleNext">{{
          progress === 2 ? "FINISH" : "NEXT"
        }}</vbutton>
      </div>
    </section>
  </section>
</template>
<script>
import Stepper from "../components/Stepper/Stepper";
import Vbutton from "../components/Button/Button";
import Typography from "../components/Typography/Typography";
const tipMap = {
  0: "Select campaign settings...",
  1: "What is an ad group anyways?",
  2: "This is the bit I really care about!",
  3: "All steps completed - you're finished",
};

export default {
  name: "StepperExample",
  components: { Stepper, Vbutton, Typography },
  data() {
    return {
      progress: 0,
      stepItems: [
        { label: "Select campaign settings" },
        { label: "Create an ad group" },
        { label: "Create an ad" },
      ],
      stepItemsWithIcons: [
        { label: "Select campaign settings", icon: "setting" },
        { label: "Create an ad group", icon: "addToGroup" },
        { label: "Create an ad", icon: "desktop" },
      ],
    };
  },
  methods: {
    handleBack() {
      if (this.progress === 3) {
        //reset
        this.progress = 0;
      } else if (this.progress === 0) {
        return;
      } else {
        this.progress -= 1;
      }
      console.log("handleBack", this.progress);
    },
    handleNext() {
      console.log("handleNext", this.progress);
      if (this.progress === 3) {
        this.progress = 0;
      } else {
        this.progress += 1;
      }
    },
  },
  computed: {
    tips() {
      return tipMap[this.progress];
    },
  },
};
</script>
<style scoped lang="less">
.stepper-example {

  ul {
    padding-left: 30px;
    margin: 0 0 16px;
    li {
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-size: 1rem;
      line-height: 1.5;
    }
  }
  .quote {
    margin: 24px 0;
    padding: 4px 24px;
    border-left: 5px solid #ffe564;
    background-color: rgba(255, 229, 100, 0.2);
    p {
      margin-top: 16px;
    }
  }
  .bg-gray {
    background-color: #f5f5f5;
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
      justify-content: center;
    }
  }
  .box-inline {
    flex-direction: row;
  }
  .margin-r8 > * {
    margin-right: 8px;
  }
}
</style>
