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
          <Rating
            :value="ratingValue050"
            :precision="0.5"
            @change="handleRatingSubmit050"
          ></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Precision: 0.5 disabled</span>
          <Rating :value="ratingValue050" :precision="0.5" disabled></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>Precision: 0.25</span>
          <Rating :value="ratingValue025" :precision="0.25" :size="48"></Rating>
        </div>
      </GroupRow>
    </GroupBox>

    <typography variant="h2">Hover feedback</typography>
    <typography variant="p"
      >You can display a label on hover to help the user pick the correct rating
      value with the <code>onHoverChange</code> prop.</typography
    >
    <GroupBox>
      <div class="wrapper-feedback">
        <Rating
          :value="ratingValue050"
          :precision="0.5"
          @hoverchange="handleHoverChange"
        ></Rating>
        <span class="text">{{ feedback }}</span>
      </div>
    </GroupBox>

    <typography variant="h2">Customized rating</typography>
    <ul>
      <li>
        Use the <code>color</code> prop to custom the color of the rating.
      </li>
      <li>
        Use the <code>icon</code> and the <code>activeIcon</code> props to
        custom the icon.
      </li>
      <li>Use the <code>max</code> prop to custom the number of the rating.</li>
    </ul>
    <GroupBox block>
      <GroupRow>
        <div class="wrapper">
          <span>Custom icon and color </span>
          <Rating
            :value="ratingValue050"
            :precision="0.5"
            icon="heart"
            activeIcon="heartFill"
            color="rgba(255, 109, 117,1)"
          ></Rating>
        </div>
      </GroupRow>
      <GroupRow>
        <div class="wrapper">
          <span>10 stars</span>
          <Rating :value="ratingValue10Stars" :max="10"></Rating>
        </div>
      </GroupRow>
    </GroupBox>

    <typography variant="h2">Radio group</typography>
    <typography variant="p"
      >Use the <code>iconGroup</code> prop to make your rating behave like a
      radio group.</typography
    >
    <GroupBox>
      <Rating
        :value="ratingValue"
        :iconGroup="[
          { icon: 'faceSad', activeIcon: 'faceSad' },
          { icon: 'faceUnhappy', activeIcon: 'faceUnhappy' },
          { icon: 'faceSoso', activeIcon: 'faceSoso' },
          { icon: 'facePleased', activeIcon: 'facePleased' },
          { icon: 'faceHappy', activeIcon: 'faceHappy' },
        ]"
      ></Rating>
    </GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
import GroupRow from "../components/Layout/GroupRow.vue";
import Rating from "../components/Rating/Rating.vue";
import Typography from "../components/Typography/Typography";
const FeedbackMap = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
export default {
  name: "RatingExample",
  components: { Typography, Rating, GroupBox, GroupRow },
  data() {
    return {
      ratingValue: 2,
      ratingValue050: 2.5,
      ratingValue025: 2,
      ratingValue10Stars: 8,
      feedback: "",
    };
  },
  methods: {
    handleRatingSubmit(e) {
      this.ratingValue = e.value;
    },
    handleRatingSubmit050(e) {
      this.ratingValue050 = e.value;
    },
    handleHoverChange(e) {
      console.log("handleHoverChange", e);
      this.feedback = FeedbackMap[e.value];
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
  .wrapper-feedback {
    display: flex;
    width: 200px;
    .text {
      margin-left: 16px;
      line-height: 24px;
      user-select: none;
    }
  }
}
</style>
