<template>
  <section class="about-me-example">
    <typography variant="h1">About Me</typography>
    <typography variant="p" :classes="['description']">Hi there, I used the mym-UI components to make a self-introduction as a resume.😀</typography>
    <typography variant="h2" id="ac-basic-information">Basic Information</typography>
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
          <chip :icon="{ name: 'create', size: 20 }" variant="outlined" color="default" text="English"></chip>
          <chip icon="face" variant="outlined" color="default" text="Chinese"></chip>
        </div>
      </div>
      <div class="col">
        <div class="info-line">
          <strong>Birth</strong>
          <chip variant="outlined" color="default" text="1998"></chip>
        </div>
        <div class="info-line">
          <strong>Email</strong>
          <chip variant="outlined" color="default" text="liuzeduo1234@gmail.com"></chip>
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
          <span class="title"><i>Level Example</i></span>
          <Rating :value="levelExample" :precision="0.5" @hoverchange="handleHoverChange" :clickable="false"></Rating>
          <span class="description">{{ getSkillDescription(levelExample) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">HTML&CSS</span>
          <Rating size="md" :value="levetHTMLCSS" :precision="0.5" readonly></Rating>
          <span class="description">{{ getSkillDescription(levetHTMLCSS) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">JS&TS</span>
          <Rating size="md" :value="levelJS" :precision="0.5" readonly></Rating>
          <span class="description">{{ getSkillDescription(levelJS) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">React</span>
          <Rating size="md" :value="levelReact" :precision="0.5" readonly></Rating>
          <span class="description">{{ getSkillDescription(levelReact) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">NextJS</span>
          <Rating size="md" :value="levelNext" :precision="0.5" readonly></Rating>
          <span class="description">{{ getSkillDescription(levelNext) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">Vue2</span>
          <Rating size="md" :value="levelVue" :precision="0.5" readonly></Rating>
          <span class="description">{{ getSkillDescription(levelVue) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">Python</span>
          <Rating size="md" :value="levelPython" :precision="0.5" readonly></Rating>
          <span class="description">{{ getSkillDescription(levelPython) }}</span>
        </div></GroupRow
      >
      <GroupRow
        ><div class="skill-info">
          <span class="title">MongoDB</span>
          <Rating size="md" :value="levelMongoDB" :precision="0.5" readonly></Rating>
          <span class="description">{{ getSkillDescription(levelMongoDB) }}</span>
        </div></GroupRow
      >
    </GroupBox>

    <typography variant="h2" id="ac-timeline">Timeline</typography>
    <GroupBox> <Timeline outlined :events="timeline"/></GroupBox>

    <!-- <typography variant="h2" id="ac-my-story">My Story About Material-UI</typography>
    <typography variant="p"><i>Material-UI is my guide to the front-end engineering no doubt.</i></typography>
    <typography variant="p"
      >Back to 2021.02, I decided to <strong>make a UI-lib from the scratch</strong> as a learn-by-doing challenge when my study abroad plan was blocked by the
      virus.</typography
    >
    <typography variant="p"
      >I found Material-UI then I learned it is using React Hooks & EmotionJS mainly. After I looked through its fresh docs and cool design system, I was
      attracted and ready to set off.</typography
    >
    <typography variant="p"
      >Suddenly a bold idea came to my mind that I needn't just make a copy instead <strong>I could make it with another framework</strong>. Not leaving React
      Hooks & EmotionJS aside, I planned to make Vuetify with the React ecosystem later.
    </typography>
    <typography variant="p"
      >In the next 2 months, I picked up my knowledge on front-end and make My-Material-UI components one by one. At that time I have
      <strong>only one target</strong>: if they look alike, behave alike, they are the same. I advanced very fast with an acquaintance of many design details.
    </typography>
    <typography variant="p"
      >In May, I felt the code I wrote before to be a mess so I began to make a codereview. I studied the docs of Vue and the source code of Vuetify and I did
      <strong>get a better understand of Vue good practices</strong>. I went on meanwhile I <strong>checked the issues</strong> from the Material-UI to keep
      track of their progress.
    </typography>
    <typography variant="p"
      >In June, I began to <strong>rewrite my code</strong> to put my components into display containers. That's why I read the docs of Material-Ui carefully on
      their design philosophy. I benefited a lot from rewriting this time so that I could
      <strong>design more user-friendly and consistent props interface</strong>
      then display my components in the pages with helpful docs. At that time
      <strong>I realized it's a must to maintain good docs.</strong>
    </typography>
    <typography variant="p"
      >Another thing important In June, I started to make Vuetify with React as my second project, Ruetify-UI. I learned React Hooks & EmotionJS & nextjs which
      were new to me. Basically what I need to do is to rewrite my components from My-Material-UI with Vuetify style. Vuetify is also a nice UI-lib while its
      docs are not as good as Material-UI's.
    </typography>
    <typography variant="p"
      >In July, I <strong>focused on some challenging components</strong> like [Slider] and [Autocomplete] etc. Given there are 2 different-frameworks projects
      going on, I had to take some time to <strong>fill the gap between React&Vue</strong>. Later this month I started <strong>Product-Hunter</strong> which is
      a clone of ProjectHub to <strong>put my components into practice</strong>. ProjectHub is a proper target of Material Design practices then I would make
      another clone again with Material-UI.
    </typography>
    <typography variant="p"
      >In Early August, I participated in some issues from <em>mui-org/material-ui</em> then I created a repo <em>mui-playground</em> to
      <strong>test features and reproduce bugs</strong>. To accelerate the progress of <em>Product-Hunter</em> I built some <strong>custom hooks</strong> like
      [useButton] and [useSlider] which are quite useful.
    </typography>
    <typography variant="p"><i>To Be Continued</i></typography> -->
    <div class="fixed-container">
      <float-action-button icon="github" color="default" size="lg" @click="handleGoToGithub"></float-action-button>
    </div>
  </section>
</template>
<script>
import FloatActionButton from "../components/Button/FloatActionButton";
import GroupBox from "../components/Layout/GroupBox.vue";
import GroupRow from "../components/Layout/GroupRow.vue";
import Timeline from "../components/Timeline/Timeline.vue";
import Typography from "../components/Typography/Typography";
import Chip from "../components/Chip/Chip";
import Rating from "../components/Rating/Rating";
const SkillLevelMap = {
  0: "Know nothing",
  0.5: "Know basic concepts",
  1: "Read examples",
  1.5: "Write snippets",
  2: "Write small projects",
  2.5: "Practice >50% features",
  3: "Build available applications",
  3.5: "Explore better practices",
  4: "Handle >80% issues independently",
  4.5: "Utilize regarding ecosystem smoothly",
  5: "Contribute to source code",
};
export default {
  name: "AboutMeExample",
  components: {
    Typography,
    Timeline,
    GroupBox,
    GroupRow,
    Chip,
    Rating,
    FloatActionButton,
  },
  anchors: [
    { anchor: "ac-basic-information", text: "Basic Information" },
    { anchor: "ac-skills", text: "Skills" },
    { anchor: "ac-timeline", text: "Timeline" },
    // { anchor: "ac-my-story", text: "My Story About Material-UI" },
  ],
  data() {
    return {
      levelExample: 0,
      levelJS: 3.5,
      levetHTMLCSS: 3,
      levelVue: 3,
      levelReact: 4,
      levelNext: 3.5,
      levelPython: 3,
      levelMongoDB: 2,
      timeline: [
        {
          left: "2016",
          right: "Entered the college",
          color: "rgb(76, 175, 80)",
        },
        {
          left: "2019",
          right: "Started a startup about AI data processing. Made an image annotation tool with React&Python",
          color: "rgb(156, 39, 176)",
        },
        {
          left: "2020.07",
          right: "Graduated from the college",
          color: "rgb(76, 175, 80)",
        },
        {
          left: "2020.08 - 2021.12",
          right: "Wrote projects in public to learn how to code",
          color: "rgb(25, 118, 210)",
        },
        {
          left: "2021.03",
          right: "Started the project mymui to build a UI lib with Vue",
          color: "rgb(25, 118, 210)",
        },
        {
          left: "2021.11 - 2021.12",
          right: "Made the project twitter-shadow to practice JAMstack",
          color: "rgb(25, 118, 210)",
        },
        {
          left: "2022.01 - 2022.06",
          right: "Worked as an FE in RSS3 making a Feed DApp",
          color: "rgb(156, 39, 176)",
        },
        {
          left: "2022.08",
          right: "Joined to build an OSS snoopForms. Made snoopForms-labrotory",
          color: "rgb(25, 118, 210)",
        },
      ],
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
    handleGoToGithub() {
      setTimeout(() => {
        window.open("https://github.com/KyLoc20");
      }, 200);
    },
  },
  computed: {},
};
</script>
<style scoped lang="less">
.about-me-example {
  .fixed-container {
    position: fixed;
    bottom: 36px;
    right: 16px;
  }
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
