<template>
  <section class="slider-example">
    <typography variant="h1">Card</typography>
    <typography variant="p" :classes="['description']"
      >Cards contain content and actions about a single subject.</typography
    >
    <typography variant="p"
      >Cards are surfaces that display content and actions on a single
      topic.</typography
    >
    <typography variant="p"
      >They should be easy to scan for relevant and actionable information.
      Elements, like text and images, should be placed on them in a way that
      clearly indicates hierarchy.
    </typography>
    <typography variant="h2">Basic card</typography>
    <typography variant="p"
      >Although cards can support multiple actions, UI controls, and an overflow
      menu, use restraint and remember that cards are entry points to more
      complex and detailed information.
    </typography>

    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <Card></Card>
    </section>
  </section>
</template>
<script>
import Card from "../components/Cards/Card";
import Typography from "../components/Typography/Typography";
export default {
  name: "CardExample",
  components: { Typography, Card },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.slider-example {
  .custom {
    width: 240px;
    height: 48px;
    padding: 14px 18px;
    font-size: 16px;
  }
}
</style>
