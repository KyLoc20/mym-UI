<template>
  <span class="icon" :style="{fill:color?color:'currentColor'}">
    <badge v-if="badge" :content="badge.content"  :size="badge.size"  :color="badge.color" :visible="badge.visible"></badge>
    <svg :class="size" focusable="false" :viewBox="viewBox" aria-hidden="true">
      <path :d="path"></path>
    </svg>
  </span>
</template>
<script>
//todo IMPORTANT Icon Component is based on the prop name to control the path, API is name not path.When name changed, the path must be updated.
import Badge from '../Badge/Badge'
import {iconMap,iconList} from './icons'
export default {
  name: "Icon",
  components: {Badge},
  props: {
    name: {
      default: "unknown",
      validator: (v) => {
        return (
          iconList.indexOf(v) !== -1
        );
      },
    },
    size: {
      default: "auto",
      validator: (v) => {
        return ["auto","sm", "md", "lg"].indexOf(v) !== -1;
      },
    },
    color:{
      type:String,
      required:false,
    },
    badge:{
      required:false,
      //todo {content,size,color,visible}
      type:Object,
    }
  },
  data() {
    return {};
  },
  computed: {
    path() {
      return iconMap[this.name].path;
    },
    viewBox() {
      return iconMap[this.name].viewBox;
    },
  },
  mounted() {
  },
  methods: {},
};
</script>
<style lang="less" scoped>
//todo its width and height need to be assigned outside
.icon {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  text-align: center;
  // color:rgba(0, 0, 0, 0.54);
  transition: fill, background-color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
// .plain .icon svg {
//   fill: white;
// }
// .primary .icon svg {
//   fill: rgba(25, 118, 210, 0.8);
// }
// .secondary .icon svg {
//   fill: rgba(220, 0, 78, 0.8);
// }
// .disabled .icon svg {
//   fill: rgba(0, 0, 0, 0.26);
// }
svg.sm {
  width: 20px;
  height: 20px;
}
svg.md {
  width: 24px;
  height: 24px;
}
svg.lg {
  width: 36px;
  height: 36px;
}
</style>