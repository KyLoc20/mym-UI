<template>
  <section class="timeline-example">
    <typography variant="h1">Timeline</typography>
    <typography variant="p" :classes="['description']"
      >The timeline displays a list of events in chronological
      order.</typography
    >
    <typography variant="h2" id="ac-basic-timeline">Basic timeline</typography>
    <typography variant="p"
      >A basic timeline showing list of events consisting of
      <strong>event nodes</strong>. The component accepts the following
      <code>events</code> structures by default.</typography
    >

    <pre>
      <code>
        <span>['Eat','Code','Sleep']</span>
      </code>
    </pre>
    <GroupBox>
      <Timeline :events="['Eat', 'Code', 'Sleep']"></Timeline
    ></GroupBox>

    <typography variant="h2" id="ac-position">Position</typography>
    <typography variant="p"
      >The description content of the events can be positioned on the left side
      or the right side or the both relative to the time axis.</typography
    >
    <GroupBox block>
      <GroupRow><Timeline></Timeline></GroupRow>
    </GroupBox>

    <typography variant="h2" id="ac-alternating">Alternating</typography>
    <typography variant="p"
      >Use the prop <code>alternating</code> to display the events on
      alternating sides.</typography
    >
    <GroupBox> </GroupBox>

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
    <GroupBox> </GroupBox>

    <typography variant="h2" id="ac-outlined">Outlined</typography>
    <typography variant="p"
      >Use the prop <code>outlined</code> to alter the <code>event dot</code> to
      outlined-style.</typography
    >
    <GroupBox> </GroupBox>
  </section>
</template>
<script>
import GroupBox from "../components/Layout/GroupBox.vue";
import GroupRow from "../components/Layout/GroupRow.vue";
import Timeline from "../components/Timeline/Timeline.vue";
import Typography from "../components/Typography/Typography";

export default {
  name: "TimelineExample",
  components: { Typography, Timeline, GroupBox, GroupRow },
  anchors: [
    { anchor: "ac-basic-timeline", text: "Basic timeline" },
    { anchor: "ac-position", text: "Position" },
    { anchor: "ac-alternating", text: "Alternating" },
    { anchor: "ac-color", text: "Color" },
    { anchor: "ac-outlined", text: "Outlined" },
  ],
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang="less">
.timeline-example {
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
