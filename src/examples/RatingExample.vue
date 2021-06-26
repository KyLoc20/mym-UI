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
        <div class="wrapper">
          <span>Controlled</span>
          <Rating
            name="controlled"
            :value="ratingValue"
            @change="handleRatingSubmit"
            dev
          ></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Read only</span>
          <Rating name="read-only" :value="ratingValue" readonly dev></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Disabled</span>
          <Rating name="read-only" :value="ratingValue" disabled dev> </Rating>
        </div>
      </GroupRow>
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
    flex-direction: column;
    margin-bottom: 5px;
    box-sizing: border-box;
  }
}
</style>
