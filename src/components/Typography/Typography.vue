<template>
  <section class="typography">
    <component :is="componentType" :class="classes"><slot></slot></component>
  </section>
</template>
<script>
const mapType = {
  h1: "Heading1",
  h2: "Heading2",
  h3: "Heading3",
  p: "Paragraph",
  span: "Span",
  quote: "Quote",
  pre: "Preformatted",
};
import Heading1 from "./types/Heading1";
import Heading2 from "./types/Heading2";
import Heading3 from "./types/Heading3";
import Paragraph from "./types/Paragraph";
import Quote from "./types/Quote";
import Span from "./types/Span";
import Preformatted from "./types/Preformatted.vue";
export default {
  name: "Typography",
  components: {
    CptHeading1: Heading1,
    CptHeading2: Heading2,
    CptHeading3: Heading3,
    CptParagraph: Paragraph,
    CptSpan: Span,
    CptQuote: Quote,
    CptPreformatted: Preformatted,
  },
  props: {
    variant: {
      type: String,
    },
    classes: {
      type: Array,
      required: false,
    },
    // content: {
    //   type: String,
    // },
  },
  computed: {
    componentType() {
      return `Cpt${mapType[this.variant]}`;
    },
  },
};
</script>
<style lang="less" scoped>
.typography {
  overflow: auto;
  /deep/ code {
    font-family: Consolas;
    font-size: 0.85em;
    background-color: rgba(255, 229, 100, 0.2);
    line-height: 1.4;
    padding: 0 2px;
    border-radius: 2px;
  }
}

.font-roboto {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
}
.color-default {
  color: rgba(0, 0, 0, 0.87);
}
.description {
  font-size: 1.5rem;
  margin: 24px 0;
}
.typography {
  .font-roboto();
  .color-default();
}
</style>
