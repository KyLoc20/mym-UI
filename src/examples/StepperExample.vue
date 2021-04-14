<template>
  <section class="stepper-example">
    <h1 class="title">Stepper</h1>
    <p class="description">
      Steppers convey progress through numbered steps. It provides a wizard-like
      workflow.
    </p>
    <p>
      Steppers display progress through a sequence of logical and numbered
      steps. They may also be used for navigation. Steppers may display a
      transient feedback message after a step is saved.
    </p>
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
      <p>
        <strong>Note:</strong> Steppers are no longer documented in the Material
        Design guidelines, but Material-UI will continue to support them.
      </p>
    </section>
    <h2>Horizontal Stepper</h2>
    <h3>Customized Stepper</h3>
    <p>
      Here is an example of customizing the component. You can learn more about
      this in the overrides documentation page.
    </p>
    <section class="group-box box-block">
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
const tipMap = {
  0: "Select campaign settings...",
  1: "What is an ad group anyways?",
  2: "This is the bit I really care about!",
  3: "All steps completed - you're finished",
};

export default {
  name: "StepperExample",
  components: { Stepper, Vbutton },
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
  h1 {
    margin: 16px 0;
    font-size: 40px;
    line-height: 46px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
  h2 {
    font-size: 30px;
    font-weight: 400;
    line-height: 1.235;
    margin: 40px 0 16px;
  }
  h3 {
    font-size: 24px;
    font-weight: 400;
    line-height: 1.334;
    margin: 40px 0 16px;
  }
  p {
    margin: 0 0 16px;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
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
  .description {
    font-size: 1.5rem;
    margin: 0 0 40px;
  }
  .group-box {
    display: flex;
    position: relative;
    padding: 24px;
    background-color: #f5f5f5;
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
