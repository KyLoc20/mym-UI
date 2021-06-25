<template>
  <section class="rating-example">
    <typography variant="h1">Rating</typography>
    <typography variant="p" :classes="['description']"
      >Ratings provide insights regarding others' opinions and experiences and
      allow the users to submit ratings of their own.</typography
    >
    <typography variant="p"
      >The widget is useful for setting the value of a single-line textbox in
      one of two types of scenarios:</typography
    >

    <typography variant="h2">Basic rating</typography>
    <GroupBox block>
      <GroupRow>
        <Rating
          name="controlled"
          :value="ratingValue"
          @change="handleRatingSubmit"
        ></Rating
      ></GroupRow>
      <GroupRow>
        <Rating name="read-only" :value="ratingValue" readonly></Rating
      ></GroupRow>
      <GroupRow>
        <Rating name="read-only" :value="ratingValue" disabled> </Rating
      ></GroupRow>
      <GroupRow> <Rating name="none-value" :value="null"></Rating></GroupRow>
    </GroupBox>

    <typography variant="h2">Rating precision</typography>
    <GroupBox>
      <Rating name="precision" :value="ratingValue"></Rating>
    </GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
import GroupRow from "../components/Layout/GroupRow.vue";
import Rating from "../components/Rating/Rating.vue";
import Typography from "../components/Typography/Typography";
export default {
  name: "RatingExample",
  components: { Typography, Rating, GroupBox, GroupRow },
  data() {
    return {
      ratingValue: 2,
    };
  },
  methods: {
    handleRatingSubmit(e) {
      this.ratingValue = e.value;
    },
  },
  computed: {},
};
</script>
<style scoped lang="less">
.rating-example {
  .wrapper {
    display: flex;
    margin-bottom: 5px;
    box-sizing: border-box;
  }
}
</style>
