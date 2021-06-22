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


    <typography variant="p" :style="{marginBottom:'300px'}"></typography>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
// import GroupRow from "../components/Layout/GroupRow.vue";
// import Icon from "../components/Icon/Icon.vue";
import Autocomplete from "../components/Autocomplete/Autocomplete.vue";
import Typography from "../components/Typography/Typography";
import { getCountryOptions } from "./data/country-options";
export default {
  name: "AutocompleteExample",
  components: { Typography, Autocomplete, GroupBox },
  anchors: [],
  data() {
    return {
      movieOptions: [
        { label: "The Shawshank Redemption", year: 1994 },
        {
          label:
            "The Lord of the Rings: The Return of the King The Lord of the Rings: The Return of the King The Lord of the Rings: The Return of the King ",
          year: 2003,
        },

        { label: "The Godfather", year: 1972 },
        { label: "The Godfather: Part II", year: 1974 },
        { label: "The Dark Knight", year: 2008 },
        { label: "12 Angry Men", year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: "Pulp Fiction", year: 1994 },

        { label: "The Good, the Bad and the Ugly", year: 1966 },
        { label: "Fight Club", year: 1999 },
        {
          label: "The Lord of the Rings: The Fellowship of the Ring",
          year: 2001,
        },
      ],
      countryOptions: getCountryOptions(),
    };
  },
  methods: {},
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
    margin-bottom: 15px;
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
