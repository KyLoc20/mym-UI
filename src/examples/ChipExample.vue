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
      >The <code>Chip</code> component supports outlined and filled styling.</typography
    >

    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <chip text="Default Basic"></chip>
      <chip color="primary" text="Primary Basic"></chip>
      <chip color="secondary" text="Secondary Basic"></chip>
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
