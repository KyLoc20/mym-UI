<template>
  <section class="item">
    <div
      class="content"
      :style="{
        paddingLeft: computedContentIndent,
        fontWeight: computedFontWeight,
        background: computedContentColor,
        color: computedContentTextColor,
      }"
      @click="handleClick"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
    >
      {{ content.text }}
    </div>
    <section
      class="children"
      :class="shouldChildrenCollapsed ? 'collapsed' : ''"
    >
      <recursive-item
        v-for="(child, idx) in children"
        :key="idx"
        :content="child.content"
        :children="child.children"
        :layerNum="layerNum"
        :layer="layer + 1"
        :tabSize="tabSize + tabEach"
        :selectedOne="selectedOne"
        @select="handleSelect"
      ></recursive-item>
    </section>
  </section>
</template>
<script>
import Rippleable from "@/mixins/rippleable";
export default {
  name: "RecursiveItem",
  mixins: [Rippleable],
  props: {
    content: {
      type: Object,
    },
    children: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selectedOne: {
      //selected item's label
      type: String,
    },
    layer: {
      //record the current layer
      type: Number,
    },
    layerNum: {
      //record the max num of layers
      type: Number,
    },
    tabSize: {
      //tab length of current item
      type: Number,
      default: 24,
    },
    tabEach: {
      //increasing tab length of children
      type: Number,
      default: 16,
    },
    tabBase: {
      type: Number,
      default: 24,
    },
    rippleable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isHovering: false,
      shouldChildrenCollapsed: false,
    };
  },
  computed: {
    isSelected() {
      return this.content.label === this.selectedOne;
    },
    hasChildren() {
      //to check whether it has children
      return this.layer < this.layerNum;
    },
    computedFontWeight() {
      if (this.hasChildren || this.isSelected) return 600;
      else return 500;
    },
    computedContentIndent() {
      //padding-left
      return `${this.tabSize}px`;
    },
    computedContentColor() {
      if (this.isSelected)
        return this.isHovering
          ? "rgba(25, 118, 210, 0.12)"
          : "rgba(25, 118, 210, 0.08)";
      else return this.isHovering ? "rgba(0, 0, 0, 0.04)" : null;
    },
    computedContentTextColor() {
      if (this.isSelected) return "#1976d2";
      else
        return this.isHovering ? "rgba(0, 0, 0, 0.87)" : "rgba(0, 0, 0, 0.6)";
    },
  },
  methods: {
    handleHoverEnter() {
      this.isHovering = true;
    },
    handleHoverLeave() {
      this.isHovering = false;
    },
    handleClick(e) {
      if (this.rippleable) this.createRipple(e, false, "default", true);
      let label = this.content.label;
      let layer = this.layer;
      let link = this.content.link;
      console.log("handleClick originally from: ", label, layer);
      this.$emit("select", { label, layer, link });
      //whether collapse its children items
      if (this.hasChildren) {
        this.shouldChildrenCollapsed = !this.shouldChildrenCollapsed;
        console.log("---->", this.shouldChildrenCollapsed);
      }
    },

    handleSelect(where) {
      let label = this.content.label;
      let layer = this.layer;
      console.log("Here is: ", label, layer, " handleSelect from: ", where);
      this.$emit("select", where);
    },
  },
};
</script>
<style lang="less" scoped>
.item {
  .content {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    height: 24px;
    border-radius: 4px;
    font-family: "Roboto", Helvetica, sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
  }
  .children {
    //todo leave enough space
    max-height: 500vh;
    transition: all 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    overflow: hidden;
  }
  .collapsed {
    max-height: 0;
    padding: 0 !important;
  }
}
</style>
