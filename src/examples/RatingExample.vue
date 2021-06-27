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
          ></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Read only</span>
          <Rating name="read-only" :value="ratingValue" readonly></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Disabled</span>
          <Rating name="read-only" :value="ratingValue" disabled> </Rating>
        </div>
      </GroupRow>
    </GroupBox>
    <typography variant="h2">Size</typography>
    <GroupBox block>
      <GroupRow>
        <div class="wrapper">
          <span>Small</span>
          <Rating
            :value="ratingValue"
            size="sm"
            @change="handleRatingSubmit"
          ></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Medium</span>
          <Rating
            :value="ratingValue"
            size="md"
            @change="handleRatingSubmit"
          ></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Large</span>
          <Rating
            :value="ratingValue"
            size="lg"
            @change="handleRatingSubmit"
          ></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Custom: 48px</span>
          <Rating
            :value="ratingValue"
            :size="48"
            @change="handleRatingSubmit"
          ></Rating>
        </div>
      </GroupRow>
    </GroupBox>

    <typography variant="h2">Rating precision</typography>
    <typography variant="p"
      >The rating can display any float number with the <code>value</code> prop.
      Use the <code>precision</code> prop to define the minimum increment value
      change allowed.</typography
    >
    <GroupBox block>
      <GroupRow>
        <div class="wrapper">
          <span>Precision: 0.5</span>
          <Rating :value="ratingValue050" :precision="0.5" @change="handleRatingSubmit050"></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Precision: 0.5 disabled</span>
          <Rating
            :value="ratingValue050"
            :precision="0.5"
            disabled
          ></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Precision: 0.25</span>
          <Rating
            :value="ratingValue025"
            :precision="0.25"
            :size="48"
            dev
          ></Rating>
        </div>
      </GroupRow>
    </GroupBox>

    <typography variant="h2">Hover feedback</typography>
    <typography variant="p"
      >You can display a label on hover to help the user pick the correct rating
      value with the <code>onHoverChange</code> prop.</typography
    >
    <GroupBox>
      <Rating :value="ratingValue"></Rating>
    </GroupBox>

    <typography variant="h2">Customized rating</typography>
    <GroupBox>
      <Rating :value="ratingValue"></Rating>
    </GroupBox>

    <typography variant="h2">Radio group</typography>
    <GroupBox>
      <Rating :value="ratingValue"></Rating>
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
      ratingValue050: 2.5,
      ratingValue025: 2,
    };
  },
  methods: {
    handleRatingSubmit(e) {
      this.ratingValue = e.value;
    },
    handleRatingSubmit050(e) {
      this.ratingValue050 = e.value;
    },
  },
  computed: {},
};
</script>
<style scoped lang="less">
.rating-example {
  .wrapper {
    width: 300px;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    box-sizing: border-box;
  }
}
</style>
