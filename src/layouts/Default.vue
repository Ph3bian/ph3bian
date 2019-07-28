<template>
  <div id="app">

      <Navigation />
  

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <span class="footer__copyright">Copyright © {{ new Date().getFullYear() }}. Phebian Chukwurah</span>
    </footer>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import ToggleTheme from "~/components/ToggleTheme.vue";
import Navigation from "~/components/Navigation.vue";
export default {
  props: {
    showLogo: { default: true }
  },
  components: {
    Logo,
    ToggleTheme,
    Navigation
  }
};
</script>

<style lang="scss">
@import "../assets/style/mixins";
.main {
  margin: 0 auto;
  padding: 1.5vw 1em;
   @include md {
       padding: 1.5vw 5.25em;
   }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 2);
  text-align: center;
  font-size: 0.8em;

  > span {
    margin: 0 0.35em;
  }

  a {
    color: currentColor;
  }
}
</style>
