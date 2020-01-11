<template v-on:scroll.passive='handleScroll'>
    <header v-bind:class="['header', isScrolled ? 'sticky' : '']">
        <div class="header__left">
            Phebian Chukwurah
        </div>

        <div class="header__right">
            <ToggleTheme />
        </div>
    </header>
</template>

<script>
import ToggleTheme from '~/components/ToggleTheme.vue'
export default {
    
    props: {
        showLogo: { default: true }
    },
    components: {
        ToggleTheme
    },
    data() {
        return { isScrolled: false }
    },
    methods: {
        handleScroll: function() {
            if (window.scrollY > 0) {
                console.log('hmmm')
                this.isScrolled = true
            } else {
                this.isScrolled = false
            }
        }
    }
}
</script>
<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: var(--header-height);
    padding: 0 calc(var(--space) / 2);
    top: 0;
    z-index: 10;

    &__left,
    &__right {
        display: flex;
        align-items: center;
    }

    @media screen and (min-width: 1300px) {
        position: sticky;
        width: 100%;
        background: var(--bgColor);
    }
}
.sticky {
    box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.1);
}
</style>
