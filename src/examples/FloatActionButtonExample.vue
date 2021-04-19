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

    <typography variant="h2">Animation</typography>
    <typography variant="p"
      >The floating action button animates onto the screen as an expanding piece
      of material, by default.</typography
    >
    <typography variant="p"
      >A floating action button that spans multiple lateral screens (such as
      tabbed screens) should briefly disappear, then reappear if its action
      changes.</typography
    >
    <typography variant="p"
      >The Zoom transition can be used to achieve this. Note that since both the
      exiting and entering animations are triggered at the same time, we use
      a enter delay to allow the outgoing Floating Action Button's animation to
      finish before the new one enters.</typography
    >

    <section class="group-box box-inline center bd-1 br-4 bg-gray">
      <div class="display-container">
        <tabs
          :items="tabsItems"
          class="bg-gray shadow-1"
          @change="handleTabsChange"
        ></tabs>
        <div class="content">{{ displayContent }}</div>
        <transition>
          <float-action-button
            icon="add"
            color="primary"
            size="lg"
            v-show="curTabIndex === 0"
          ></float-action-button>
        </transition>
        <transition>
          <float-action-button
            icon="edit"
            color="secondary"
            size="lg"
            v-show="curTabIndex === 1"
          ></float-action-button>
        </transition>
        <transition>
          <float-action-button
            icon="up"
            color="green"
            size="lg"
            v-show="curTabIndex === 2"
          ></float-action-button>
        </transition>
      </div>
    </section>
  </section>
</template>
<script>
import FloatActionButton from "../components/Button/FloatActionButton";
// import Vbutton from "../components/Button/Button";
import Tabs from "../components/Tabs/Tabs";
import Typography from "../components/Typography/Typography";
export default {
  name: "FloatActionButtonExample",
  components: { FloatActionButton, Typography, Tabs },
  data() {
    return {
      tabsItems: [
        {
          label: "one",
          text: "Item One",
        },
        {
          label: "two",
          text: "Item Two",
        },
        {
          label: "three",
          text: "Item Three",
        },
      ],
      curTabIndex: null,
    };
  },
  mounted() {
    this.curTabIndex = 0;
  },
  computed: {
    displayContent() {
      if (this.curTabIndex === null) return 0;
      else return this.tabsItems[this.curTabIndex].text;
    },
  },
  methods: {
    handleTabsChange(e) {
      let { last, next } = e;
      console.log("handleTabsChange", last, next);
      this.curTabIndex = next.index;
    },
  },
};
</script>
<style scoped lang="less">
.float-action-button-example {
  .display-container {
    display: flex;
    position: relative;
    background: #fff;
    width: 500px;
    height: 200px;
    flex-direction: column;

    .tabs {
      /deep/ .anchor {
        font-weight: 500;
      }
      width: 100%;
      height: 48px;
    }
    .content {
      padding: 24px;
      line-height: 1.5;
      letter-spacing: 0.02em;
    }
    .float-action-button {
      position: absolute;
      right: 16px;
      bottom: 16px;
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
      &.jc-center {
        justify-content: center;
      }
      &.ai-center {
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
.v-enter-active {
  transition: transform 251ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;
}
.v-leave-active {
  transition: transform 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.v-enter,
.v-leave-to {
  transform: scale(0);
}
</style>
