<template>
    <Layout :show-logo="false">
        <!-- <Author :show-title="true" /> -->
        <HeroContainer />
        <WorkHistory />
        <Tools />
    </Layout>
</template>

<script>
import Author from '~/components/Author.vue'
import HeroContainer from '~/components/HeroContainer.vue'
import WorkHistory from '~/components/WorkHistory.vue'
import Tools from '~/components/Tools.vue'
export default {
    components: {
        Author,
        HeroContainer,
        WorkHistory,
        Tools
    },
    metaInfo: {
        title: 'Hello, world!'
    }
}
</script>
