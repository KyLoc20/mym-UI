<template>
  <section class="checkbox-example">
    <typography variant="h1">Checkbox</typography>
    <typography variant="p" :classes="['description']"
      >Checkboxes can be used to turn an option on or off.</typography
    >
    <typography variant="p"
      >If you have multiple options appearing in a list, you can preserve space
      by using checkboxes instead of on/off switches. If you have a single
      option, avoid using a checkbox and use an on/off switch
      instead.</typography
    >

    <typography variant="h2">Basic checkboxes</typography>
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <checkbox></checkbox>
       <checkbox checked></checkbox>
      <checkbox disabled></checkbox>
     <checkbox disabled checked></checkbox>
    </section>

  
  </section>
</template>
<script>
import Checkbox from "../components/Checkbox/Checkbox";
import Typography from "../components/Typography/Typography";
export default {
  name: "CheckboxExample",
  components: { Typography, Checkbox },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {},
};
</script>
<style scoped lang="less">
.checkbox-example {
}
</style>
