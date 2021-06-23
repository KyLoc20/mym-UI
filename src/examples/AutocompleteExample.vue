<template>
  <section class="autocomplete-example">
    <typography variant="h1">Autocomplete</typography>
    <typography variant="p" :classes="['description']"
      >The autocomplete is a normal text input enhanced by a panel of suggested
      options.</typography
    >
    <typography variant="p"
      >The widget is useful for setting the value of a single-line textbox in
      one of two types of scenarios:</typography
    >
    <ul>
      <li>
        The value for the textbox must be chosen from a predefined set of
        allowed values, e.g., a location field must contain a valid location
        name: combo box.
      </li>
      <li>
        The textbox may contain any arbitrary value, but it is advantageous to
        suggest possible values to the user, e.g., a search field may suggest
        similar or previous searches to save the user time: free solo.
      </li>
    </ul>
    <typography variant="h2">Combo box</typography>
    <typography variant="p"
      >The value must be chosen from a predefined set of allowed values. Use the
      prop <code>options</code> to predefine them.</typography
    >
    <GroupBox>
      <Autocomplete
        :options="movieOptions"
        placeholder="Movie"
        dev
      ></Autocomplete>
    </GroupBox>

    <typography variant="h2">Options structure</typography>
    <typography variant="p"
      >The component accepts the following options structures by
      default.</typography
    >
    <pre>
      <code>
        <span>[{label: String}]</span>
      </code>
    </pre>
    <typography variant="quote">
      <typography variant="p"
        ><strong>Note: </strong> the <code>label</code> property must be existed
        and unique.</typography
      >
    </typography>
    <typography variant="p"
      >You can set other properties as you want in each option.</typography
    >
    <pre>
      <code>
        <span>[{label: 'Canada', code: 'CA', phone: '1', suggested: true}]</span>
      </code>
    </pre>
    <typography variant="p"
      >You can use the <code>parseOption</code> prop to define a parser function
      which parses each option text.</typography
    >
    <pre>
      <code>
        <span>(option) => `${option.label} (${option.code}) +${option.phone}`</span>
      </code>
    </pre>
    <GroupBox>
      <Autocomplete
        :options="countryOptions"
        :parseOption="countryOptionsParser"
        placeholder="Select a country"
      ></Autocomplete>
    </GroupBox>

    <typography variant="h2">Clearable</typography>
    <typography variant="p"
      >Use the <code>clearable</code> prop with <code>false</code> to unable the
      clear behaviors.</typography
    >
    <GroupBox>
      <Autocomplete
        :options="movieOptions"
        placeholder="Movie"
        :clearable="false"
      ></Autocomplete>
    </GroupBox>

    <typography variant="h2">Keyborad</typography>
    <typography variant="p"
      >You can use keyboard conveniently when the component is
      focused.</typography
    >
    <ul>
      <li>
        Look up the selection when pressing <span class="key">up</span> or
        <span class="key">down</span>.
      </li>
      <li>
        Confirm your selection when pressing <span class="key">enter</span>.
      </li>
      <li>
        Stop the selection process when pressing <span class="key">esc</span>.
      </li>
      <li>
        Clear the inputValue when pressing <span class="key">ctrl</span>+<span class="key">delete</span>.
      </li>
    </ul>
    <typography variant="h2">Controlled states</typography>
    <typography variant="p"
      >The component has two states that can be controlled:</typography
    >
    <ul>
      <li>
        The "value" with the <code>cValue</code>/<code>onChange</code>
        combination which represents the value selected by the user.
      </li>
      <li>
        The "inputValue" with the <code>inputValue</code>/<code
          >onInputChange</code
        >
        combination which represents the value displayed in the textfield and
        availabel to edit.
      </li>
    </ul>
    <GroupBox block>
      <GroupRow>
        <div
          class="wrapper"
          :style="{
            display: 'flex',
            flexDirection: 'column',
            width: '316px',
            padding: '0 16px',
          }"
        >
          <div :style="{ lineHeight: '24px' }">
            <span>value: </span>'{{ controlledValue }}'<span></span>
          </div>
          <div :style="{ lineHeight: '24px' }">
            <span>inputValue: </span>'{{ controlledInputValue }}'<span></span>
          </div></div
      ></GroupRow>
      <GroupRow>
        <Autocomplete
          :options="controlledOptions"
          placeholder="Controllalbe"
          @change="handleChangeControlledValue"
          @inputchange="handleChangeControlledInputValue"
        ></Autocomplete
      ></GroupRow>
    </GroupBox>

    <typography variant="p" :style="{ marginBottom: '300px' }"></typography>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
import GroupRow from "../components/Layout/GroupRow.vue";
// import Icon from "../components/Icon/Icon.vue";
import Autocomplete from "../components/Autocomplete/Autocomplete.vue";
import Typography from "../components/Typography/Typography";
import { getCountryOptions } from "./data/country-options";
import { getMovieOptions } from "./data/movie-options";
export default {
  name: "AutocompleteExample",
  components: { Typography, Autocomplete, GroupBox, GroupRow },
  anchors: [],
  data() {
    return {
      controlledValue: null,
      controlledInputValue: null,
      controlledOptions: [{ label: "Option1" }, { label: "Option2" }],
      movieOptions: getMovieOptions(),
      countryOptions: getCountryOptions(),
    };
  },
  methods: {
    handleChangeControlledValue(e) {
      this.controlledValue = e.value;
    },
    handleChangeControlledInputValue(e) {
      this.controlledInputValue = e.value;
    },
  },
  computed: {
    countryOptionsParser() {
      return (option) => `${option.label} (${option.code}) +${option.phone}`;
    },
  },
};
</script>
<style scoped lang="less">
.autocomplete-example {
  .wrapper {
    display: flex;
    margin-bottom: 5px;
    box-sizing: border-box;
  }
  .key {
    font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    color: rgba(0, 0, 0, 0.87);
    border: 1px solid #d1d5da;
    margin: 0 1px;
    display: inline-block;
    padding: 4px 5px;
    box-shadow: inset 0 -1px 0 #d1d5da;
    line-height: 10px;
    white-space: nowrap;
    border-radius: 6px;
    vertical-align: middle;
    background-color: #fafbfc;
  }
  pre {
    display: flex;
    margin: 24px 0;
    padding: 16px;
    overflow: auto;
    border-radius: 4px;
    background-color: #272c34;
    code {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background: transparent;
      color: #fff;
      font-size: 0.9em;
      line-height: 1.5;
      padding: 0 3px;
    }
  }
}
</style>
