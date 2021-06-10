<template>
  <section class="select-example">
    <typography variant="h1">Select</typography>
    <typography variant="p" :classes="['description']"
      >Select components are used for collecting user provided information from
      a list of options.</typography
    >
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
    <typography variant="h2" id="ac-menu-position">Menu Position</typography>
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
        helper="over menu"
      ></vselect>
      <vselect
        variant="filled"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
        helper="over menu"
      ></vselect>
      <vselect
        variant="outlined"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
        helper="over menu"
      ></vselect>
    </section>
    <typography variant="p"
      >Menus are positioned under their emitting elements.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vselect
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        helper="under menu"
        @change="handleChange"
        menuDown
      ></vselect>
      <vselect
        variant="filled"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        helper="under menu"
        @change="handleChange"
        menuDown
      ></vselect>
      <vselect
        variant="outlined"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        helper="under menu"
        @change="handleChange"
        menuDown
      ></vselect>
    </section>
    <typography variant="h2" id="ac-description"
      >Label, placeholder and helper text</typography
    >
    <typography variant="p">
      There are 3 types of description text in this component:
    </typography>
    <ul>
      <li>
        Label can be floating above the inpout content which indicates the
        primary infoformation. Use the prop <code>labelHidden</code> to hide it.
      </li>
      <li>
        Helper is below the input content to provide some helpful messages. Use
        the prop <code>helper</code> to add text.
      </li>
      <li>
        placeholder appears in the position of the selected item when no item
        selected. Use the prop <code>placeholder</code> to add text.
      </li>
    </ul>
    <section class="group-box box-block bd-1 br-4 padding-4">
      <section class="row margin-8">
        <vselect
          variant="standard"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          placeholder="placeholder"
          :width="150"
          helper="label with placeholder"
        ></vselect>
        <vselect
          variant="filled"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          placeholder="placeholder"
          :width="150"
          helper="label with placeholder"
        ></vselect>
        <vselect
          variant="outlined"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          placeholder="placeholder"
          :width="150"
          helper="label with placeholder"
        ></vselect>
      </section>
      <section class="row margin-8">
        <vselect
          variant="standard"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          :width="150"
          helper="label without placeholder"
        ></vselect>
        <vselect
          variant="filled"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          :width="150"
          helper="label without placeholder"
        ></vselect>
        <vselect
          variant="outlined"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          :width="150"
          helper="label without placeholder"
        ></vselect>
      </section>
      <section class="row margin-8">
        <vselect
          variant="standard"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          labelHidden
          placeholder="placeholder"
          :width="150"
          helper="only placeholder"
        ></vselect>
        <vselect
          variant="filled"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          labelHidden
          placeholder="placeholder"
          :width="150"
          helper="only placeholder"
        ></vselect>
        <vselect
          variant="outlined"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          labelHidden
          placeholder="placeholder"
          :width="150"
          helper="only placeholder"
        ></vselect>
      </section>
      <section class="row margin-8">
        <vselect
          variant="standard"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          labelHidden
          helper="empty"
        ></vselect>
        <vselect
          variant="filled"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          labelHidden
          helper="empty"
        ></vselect>
        <vselect
          variant="outlined"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          labelHidden
          helper="empty"
        ></vselect>
      </section>
    </section>

    <typography variant="h2" id="ac-width">Width</typography>
    <typography variant="p"
      >Use the <code>width</code> prop to change the width of this component. By
      default it is 120px.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vselect
        variant="standard"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
        helper="default width"
      ></vselect>
      <vselect
        variant="filled"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
        helper="80px width"
        :width="80"
      ></vselect>
      <vselect
        variant="outlined"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        helper="240px width"
        :width="240"
      ></vselect>
    </section>
    <typography variant="p"
      >Use the <code>fitWidth</code> prop to make it change its width
      automatically.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <vselect
        variant="standard"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
        fitWidth
      ></vselect>
      <vselect
        variant="filled"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        @change="handleChange"
        placeholder="placeholder"
        fitWidth
      ></vselect>
      <vselect
        variant="outlined"
        label="Age"
        :items="selectItems"
        :activeIndex="activeIndex"
        fitWidth
      ></vselect>
    </section>
    <typography variant="h2" id="ac-other-props">Other props</typography>
    <section class="group-box box-block bd-1 br-4 padding-4">
      <section class="row margin-8">
        <vselect
          variant="standard"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          disabled
          helper="disabled"
        ></vselect>
        <vselect
          variant="filled"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          disabled
          helper="disabled"
        ></vselect>
        <vselect
          variant="outlined"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          disabled
          helper="disabled"
        ></vselect>
      </section>
      <section class="row margin-8">
        <vselect
          variant="standard"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          readonly
          helper="readonly"
        ></vselect>
        <vselect
          variant="filled"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          readonly
          helper="readonly"
        ></vselect>
        <vselect
          variant="outlined"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          readonly
          helper="readonly"
        ></vselect>
      </section>
      <section class="row margin-8">
        <vselect
          variant="standard"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          required
          helper="required"
        ></vselect>
        <vselect
          variant="filled"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          required
          helper="required"
        ></vselect>
        <vselect
          variant="outlined"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          required
          helper="required"
        ></vselect>
      </section>
    </section>
    <typography variant="h2" id="ac-error">Error</typography>
    <typography variant="p"
      >Use the <code>errorFound</code> prop to tell error appeared.</typography
    >
    <section class="group-box box-block bd-1 br-4 padding-4">
      <section class="row margin-8">
        <vselect
          variant="standard"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          :errorFound="computedActiveLabel && computedActiveLabel !== 'twenty'"
          :helper="
            computedActiveLabel
              ? computedActiveLabel === 'twenty'
                ? 'Correct'
                : 'Error need 20'
              : 'Select One'
          "
        ></vselect>
        <vselect
          variant="filled"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          :errorFound="computedActiveLabel && computedActiveLabel !== 'twenty'"
          :helper="
            computedActiveLabel
              ? computedActiveLabel === 'twenty'
                ? 'Correct'
                : 'Error need 20'
              : 'Select One'
          "
        ></vselect>
        <vselect
          variant="outlined"
          label="Age"
          :items="selectItems"
          :activeIndex="activeIndex"
          @change="handleChange"
          :errorFound="computedActiveLabel && computedActiveLabel !== 'twenty'"
          :helper="
            computedActiveLabel
              ? computedActiveLabel === 'twenty'
                ? 'Correct'
                : 'Error need 20'
              : 'Select One'
          "
        ></vselect>
      </section>
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
    { anchor: "ac-variant", text: "Variant" },
    { anchor: "ac-menu-position", text: "Menu Position" },
    { anchor: "ac-description", text: "Label, placeholder and helper text" },
    { anchor: "ac-width", text: "Width" },
    { anchor: "ac-other-props", text: "Other props" },
    { anchor: "ac-error", text: "Error" },
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
  computed: {
    computedActiveLabel() {
      if (this.activeIndex < 0) return null;
      else return this.selectItems[this.activeIndex].label;
    },
  },
  methods: {
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
};
</script>
<style scoped lang="less">
.select-example {
}
</style>
