<template>
  <section class="select-example">
    <typography variant="h1">Select</typography>
    <typography variant="p" :classes="['description']"
      >Select components are used for collecting user provided information from
      a list of options.</typography
    >
    <typography variant="h2" id="ac-basic-select">Basic select</typography>
    <typography variant="p"
      >Menus are positioned over their emitting elements such that the currently
      selected item appears on the top of the emitting element.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vselect
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
        dev
      ></vselect>
      <div class="test">
        <input id="1" type="text" @focus="handleFocus" @blur="handleBlur" />
        <label for="1" @mousedown="handle1">123456</label>
        <span class="text">{{ isFocused }}</span>
      </div>
    </section>
    <typography variant="p"
      >Menus are positioned under their emitting elements.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vselect
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        placeholder="placeholder"
        helper="my name is liuzeduoxcc"
        @change="handleChange"
      ></vselect>
    </section>
    <typography variant="h2" id="ac-variant">Variant</typography>
    <typography variant="p"
      >Use the <code>variant</code> prop to decide the basic style including
      standard, filled and outlined.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vselect
        variant="standard"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
      ></vselect>
      <vselect
        variant="filled"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
      ></vselect>
      <vselect
        variant="outlined"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
      ></vselect>
    </section>
  </section>
</template>
<script>
import Vselect from "../components/Select/Select";
import Typography from "../components/Typography/Typography";
export default {
  name: "SelectExample",
  components: { Typography, Vselect },
  //for in-page navigation
  anchors: [
    { anchor: "ac-basic-select", text: "Basic select" },
    { anchor: "ac-variant", text: "Variant" },
  ],
  data() {
    return {
      activeIndex: 3,
      selectItems: [
        { label: "ten", text: "Ten" },
        { label: "twenty", text: "Twenty" },
        { label: "thirty", text: "Thirty" },
        { label: "forty", text: "Forty" },
        { label: "fifty", text: "Fifty" },
      ],
      isFocused: false,
    };
  },

  methods: {
    handle1(e) {
      e.preventDefault();
    },
    handleChange(e) {
      this.activeIndex = this.getIndexByKeyValue(
        this.selectItems,
        "label",
        e.label
      );
      console.log("handleChange", e, this.activeIndex);
    },
    getIndexByKeyValue(arr, key, value) {
      for (let [index, el] of arr.entries()) {
        if (el[key] === value) return index;
      }
      return -1;
    },
    handleFocus() {
      //console.log("handleFocus");
      if (!this.disabled) this.isFocused = true;
    },
    handleBlur() {
      //console.log("handleBlur");
      if (!this.disabled) this.isFocused = false;
    },
  },
  computed: {},
};
</script>
<style scoped lang="less">
.select-example {
  .test {
    position: relative;
    .text {
      position: absolute;
      left: 200%;
    }
  }
}
</style>
