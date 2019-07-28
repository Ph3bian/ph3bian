<template>
  <Layout :show-logo="false">
    <!-- <Author :show-title="true" /> -->
    <HeroContainer />
    <WorkHistory />
  </Layout>
</template>

<script>
import Author from "~/components/Author.vue";
import HeroContainer from "~/components/HeroContainer.vue";
import WorkHistory from "~/components/WorkHistory.vue";

export default {
  components: {
    Author,
    HeroContainer,
    WorkHistory
  },
  metaInfo: {
    title: "Hello, world!"
  }
};
</script>
