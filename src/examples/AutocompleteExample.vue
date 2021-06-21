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
    <GroupBox> <Autocomplete :options="movieOptions" placeholder="Movie" dev></Autocomplete> </GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
// import GroupRow from "../components/Layout/GroupRow.vue";
// import Icon from "../components/Icon/Icon.vue";
import Autocomplete from "../components/Autocomplete/Autocomplete.vue";
import Typography from "../components/Typography/Typography";
export default {
  name: "AutocompleteExample",
  components: { Typography, Autocomplete, GroupBox },
  anchors: [],
  data() {
    return {
      movieOptions: [
        { label: "The Shawshank Redemption111111111111111111111111111111111", year: 1994 },
        { label: "The Godfather", year: 1972 },
        { label: "The Godfather: Part II", year: 1974 },
        { label: "The Dark Knight", year: 2008 },
        { label: "12 Angry Men", year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: "Pulp Fiction", year: 1994 },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.autocomplete-example {
  .wrapper {
    display: flex;
    margin-bottom: 15px;
  }
}
</style>
