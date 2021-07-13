<template>
  <section class="about-me-example">
    <typography variant="h1">About Me</typography>
    <typography variant="p" :classes="['description']"
      >Hi there, I used the mym-UI components to make a self-introduction as a
      resume.😀</typography
    >
    <typography variant="h2" id="ac-basic-information"
      >Basic Information</typography
    >
    <GroupBox>
      <div class="col">
        <div class="info-line">
          <strong>Name</strong>
          <chip variant="outlined" color="default" text="Kyloc Lau"></chip>
        </div>
        <div class="info-line">
          <strong>Living In</strong>
          <chip variant="outlined" color="default" text="UTC+8"></chip>
        </div>
        <div class="info-line">
          <strong>Languages</strong>
          <chip
            :icon="{ name: 'create', size: 20 }"
            variant="outlined"
            color="default"
            text="English"
          ></chip>
          <chip
            icon="face"
            variant="outlined"
            color="default"
            text="Chinese"
          ></chip>
        </div>
      </div>
      <div class="col">
        <div class="info-line">
          <strong>Birth</strong>
          <chip variant="outlined" color="default" text="1998"></chip>
        </div>
        <div class="info-line">
          <strong>Email</strong>
          <chip
            variant="outlined"
            color="default"
            text="liuzeduo1234@gmail.com"
          ></chip>
        </div>
        <div class="info-line">
          <strong>Education</strong>
          <chip variant="outlined" color="default" text="BCS,UESTC"></chip>
        </div>
      </div>
    </GroupBox>

    <typography variant="h2" id="ac-skills">Skills</typography>
    <GroupBox block>
      <GroupRow
        ><div class="skill-info">
          <span class="title">Level Example</span>
          <Rating
            :value="levelExample"
            :precision="0.5"
            @hoverchange="handleHoverChange"
            :clickable="false"
          ></Rating>
          <span class="description">{{
            getSkillDescription(levelExample)
          }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">Javascript(ES6)</span>
          <Rating size="md" :value="levelJS" :precision="0.5" readonly></Rating>
          <span class="description">{{ getSkillDescription(levelJS) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">HTML&CSS</span>
          <Rating
            size="md"
            :value="levetHTMLCSS"
            :precision="0.5"
            readonly
          ></Rating>
          <span class="description">{{
            getSkillDescription(levetHTMLCSS)
          }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">Vue</span>
          <Rating
            size="md"
            :value="levelVue"
            :precision="0.5"
            readonly
          ></Rating>
          <span class="description">{{ getSkillDescription(levelVue) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">React</span>
          <Rating
            size="md"
            :value="levelReact"
            :precision="0.5"
            readonly
          ></Rating>
          <span class="description">{{ getSkillDescription(levelReact) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">EmotionJs</span>
          <Rating
            size="md"
            :value="levelEmotion"
            :precision="0.5"
            readonly
          ></Rating>
          <span class="description">{{
            getSkillDescription(levelEmotion)
          }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">Python</span>
          <Rating
            size="md"
            :value="levelPython"
            :precision="0.5"
            readonly
          ></Rating>
          <span class="description">{{
            getSkillDescription(levelPython)
          }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">MongoDB</span>
          <Rating
            size="md"
            :value="levelMongoDB"
            :precision="0.5"
            readonly
          ></Rating>
          <span class="description">{{
            getSkillDescription(levelMongoDB)
          }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">CPP</span>
          <Rating
            size="md"
            :value="levelCpp"
            :precision="0.5"
            readonly
          ></Rating>
          <span class="description">{{ getSkillDescription(levelCpp) }}</span>
        </div></GroupRow
      >
    </GroupBox>

    <typography variant="h2" id="ac-timeline">Timeline</typography>
    <typography variant="h2" id="ac-my-story"
      >My Story About Material-UI</typography
    >
    <pre>
      <code>
        <span>['Eat','Code','Sleep']</span>
      </code>
    </pre>
    <GroupBox>
      <Timeline :events="['Eat', 'Code', 'Sleep']"></Timeline
    ></GroupBox>
    <typography variant="p"
      >You can specify the positions of descriptions or have two descriptions on
      the both sides with the following
      <code>events</code> structures.</typography
    >
    <pre>
      <code>
        <span>['Eat', {left:'Code',right:'10:00 am'}, {right:'Run'}, {left:'18:00 pm',right:'Drink'}, 'Sleep']</span>
      </code>
    </pre>
    <GroupBox>
      <Timeline
        :events="[
          'Eat',
          { left: 'Code', right: '10:00 am' },
          { right: 'Run' },
          { left: '18:00 pm', right: 'Drink' },
          'Sleep',
        ]"
      ></Timeline
    ></GroupBox>

    <typography variant="h2" id="ac-position">Position</typography>
    <typography variant="p"
      >The descriptions of the events can be positioned in the different
      positions (by default they are on the right side) relative to the time
      axis.</typography
    >
    <typography variant="quote">
      <strong>Note:</strong> the events with two descriptions aren't
      affected.</typography
    >
    <typography variant="p"
      >Use the prop <code>leftPositioned</code> to display the descriptions on
      the left sides.</typography
    >
    <GroupBox>
      <Timeline :events="['Eat', 'Code', 'Sleep']" leftPositioned></Timeline
    ></GroupBox>
    <typography variant="p"
      >Use the prop <code>alternating</code> to display the descriptions on
      alternating sides.</typography
    >
    <GroupBox>
      <Timeline
        :events="['Eat', 'Code', 'Run', 'Drink', 'Sleep']"
        alternating
      ></Timeline
    ></GroupBox>

    <typography variant="h2" id="ac-color">Color</typography>
    <ul>
      <li>
        Use the prop <code>color</code> to set the color of the
        <strong>event dot</strong>.
      </li>
      <li>
        Use the prop <code>textColor</code> to set the color of the
        <strong>event description</strong> text.
      </li>
      <li>
        Use the prop <code>barColor</code> to set the color of the
        <strong>event bar</strong>.
      </li>
    </ul>
    <GroupBox>
      <Timeline
        :events="['Eat', 'Code', 'Sleep']"
        color="rgb(76, 175, 80)"
        textColor="rgb(25, 118, 210)"
        barColor="rgb(156, 39, 176)"
      ></Timeline
    ></GroupBox>

    <typography variant="h2" id="ac-outlined">Outlined</typography>
    <typography variant="p"
      >Use the prop <code>outlined</code> to alter the <code>event dot</code> to
      outlined-style.</typography
    >
    <GroupBox>
      <Timeline
        outlined
        :events="[
          'Eat',
          { left: 'Code', color: 'rgb(25, 118, 210)' },
          'Sleep',
          { left: 'Repeat', color: 'rgb(156, 39, 176)' },
        ]"
      ></Timeline>
    </GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
import GroupRow from "../components/Layout/GroupRow.vue";
import Timeline from "../components/Timeline/Timeline.vue";
import Typography from "../components/Typography/Typography";
import Chip from "../components/Chip/Chip";
import Rating from "../components/Rating/Rating";
const SkillLevelMap = {
  0: "Know nothing",
  0.5: "Know more than nothing",
  1: "Know some basic concepts",
  1.5: "Undestand simple examples",
  2: "Make something with it",
  2.5: "Finish projects with doc",
  3: "Experienced most features",
  3.5: "Handle most common issues",
  4: "Understand most principles",
  4.5: "Optimize performance",
  5: "Improve even implement it on my own",
};
export default {
  name: "AboutMeExample",
  components: { Typography, Timeline, GroupBox, GroupRow, Chip, Rating },
  anchors: [
    { anchor: "ac-basic-information", text: "Basic Information" },
    { anchor: "ac-skills", text: "Skills" },
    { anchor: "ac-timeline", text: "Timeline" },
    { anchor: "ac-my-story", text: "My Story About Material-UI" },
  ],
  data() {
    return {
      levelExample: 0,
      levelJS: 3,
      levelVue: 3.5,
      levelReact: 3,
      levelEmotion: 2.5,
      levelPython: 3.5,
      levelMongoDB: 2.5,
      levelCpp: 2,
      levetHTMLCSS: 2.5,
    };
  },
  methods: {
    handleRatingChange(e) {
      this.levelExample = e.value;
    },
    handleHoverChange(e) {
      console.log("handleHoverChange", e);
      this.levelExample = e.value;
    },
    getSkillDescription(rating) {
      return SkillLevelMap[rating];
    },
  },
  computed: {},
};
</script>
<style scoped lang="less">
.about-me-example {
  .col {
    flex: 1;
    display: flex;
    flex-direction: column;
    .info-line {
      display: flex;
      align-items: center;
      margin: 4px 0;
      strong {
        min-width: 80px;
      }
      .chip {
        margin-left: 6px;
      }
    }
  }
  .skill-info {
    display: flex;
    align-items: center;
    width: 600px;
    .title {
      min-width: 130px;
      font-size: 18px;
      line-height: 32px;
      margin-right: 16px;
      user-select: none;
    }
    .description {
      margin-left: 16px;
      line-height: 24px;
      user-select: none;
    }
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
