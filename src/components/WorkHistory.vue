<template>
  <div class="history">
    <h2>Work History</h2>
    <div class="row_Container">
      <div class="card">
        <h3>Kudi</h3>
        <p>Full Stack Developer</p>
      </div>
      <div class="card">
        <h3>Softcom</h3>
        <p>FrontEnd Developer</p>
      </div>
      <div class="card">
        <h3>Seamfix</h3>
        <p>FrontEnd Developer</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../assets/style/mixins";

.history {
  margin-top: 1em;
  justify-content: center;
  font-size: 1rem;
  text-align: center;
  h2 {
    margin: 3em auto 2em;
  }
  .row_Container {
    display: grid;
    grid-template-columns: 100%;
    grid-row-gap: 1em;
    justify-content: center;
    align-items: center;
  }

  @include md {
    .row_Container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 3em;
    }
  }
}
</style>
