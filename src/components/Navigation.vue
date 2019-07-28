<template>

 <header class="header">
      <div class="header__left">
     Phebian Chukwurah
      </div>
      
      <div class="header__right">        
        <ToggleTheme />
      </div>
    </header>
  
</template>

<script>
import ToggleTheme from "~/components/ToggleTheme.vue";
export default {
  props: {
    showLogo: { default: true }
  },
  components: {
    ToggleTheme
  }
};
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
    //Make header sticky for large screens
    position: sticky;
    width: 100%;
  }
}

</style>
