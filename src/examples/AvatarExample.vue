<template>
  <section class="avatar-example">
    <typography variant="h1">Avatar</typography>
    <typography variant="p" :classes="['description']"
      >Avatars are found throughout material design with uses in everything from
      tables to dialog menus.</typography
    >
    <typography variant="h2">Image avatars</typography>
    <typography variant="p"
      >Image avatars can be created by passing <code>src</code> props to the
      component.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <avatar src="/avatar1.jpg" size="md"></avatar>
      <avatar src="/avatar2.jpg" size="md"></avatar>
      <avatar src="/avatar3.jpg" size="md"></avatar>
    </section>

    <typography variant="h2">Letter avatars</typography>
    <typography variant="p"
      >Avatars containing simple characters can be created by passing a string
      as <code>children</code>.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <avatar color="default">A</avatar>
      <avatar color="primary">B</avatar>
      <avatar color="secondary">C</avatar>
      <avatar color="purple">D</avatar>
      <avatar color="orange">E</avatar>
    </section>

    <typography variant="h2">Sizes</typography>
    <typography variant="p"
      >You can change the size of the avatar with the
      <code>size</code> props.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <avatar src="/avatar1.jpg" size="sm"></avatar>
      <avatar src="/avatar1.jpg" size="md"></avatar>
      <avatar src="/avatar1.jpg" size="lg"></avatar>
    </section>

    <typography variant="h2">With badge</typography>
    <typography variant="p"
      >You can add a badge to the avatar with the
      <code>badge</code> props.</typography
    >
    <section class="group-box box-inline center margin-8 bd-1 br-4">
      <avatar src="/avatar1.jpg" size="lg" :badge="0"></avatar>
      <avatar src="/avatar1.jpg" size="lg" :badge="1"></avatar>
      <avatar
        src="/avatar1.jpg"
        size="lg"
        :badge="{ content: 12, simple: false }"
      ></avatar>
      <avatar
        src="/avatar1.jpg"
        size="lg"
        :badge="{ content: 12, rippleable: true }"
      ></avatar>
    </section>
  </section>
</template>
<script>
import Avatar from "../components/Avatar/Avatar";
// import Vbutton from "../components/Button/Button";
import Typography from "../components/Typography/Typography";
export default {
  name: "FloatActionButton",
  components: { Avatar, Typography },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
};
</script>
<style scoped lang="less">
.avatar-example {
  .quote {
    margin: 24px 0;
    padding: 4px 24px;
    border-left: 5px solid #ffe564;
    background-color: rgba(255, 229, 100, 0.2);
    p {
      margin-top: 16px;
    }
  }

  .group-box {
    display: flex;
    position: relative;
    padding: 24px;
    p {
      margin: 8px 0;
    }
  }
  .box-block {
    flex-direction: column;
    .row {
      display: flex;
      background: #fff;
      padding: 24px;
      justify-content: center;
    }
  }
  .box-inline {
    flex-direction: row;
    &.center {
      justify-content: center;
    }
    .col {
      display: flex;
      background: #fff;
      padding: 24px;
      justify-content: center;
    }
  }
}
</style>
