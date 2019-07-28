<template>
  <section>
    <div class="card">
      <div class="about">
        <h1>Javascript Developer</h1>
        <p>Lagos based software developer with experience working with AngularJs, Angular, VueJs, ReactJs and NodeJs.</p>
        <p>
          I design and build web applications. I currently work as a Full-Stack Developer at
          <a
            target="_blank"
            href="//kudi.co/"
          >KudiHq.</a>
        </p>
        <div>
          <a target="_blank" href="//twitter.com/ph3bian">Twitter</a>
          <a target="_blank" href="//github.com/ph3bian">Github</a>
        </div>
      </div>
      <div class="image-container"> </div>
    </div>
  </section>
</template>
<style lang="scss">
@import "../assets/style/mixins";
section {
  font-size: 1rem;
  text-align: center;
  @include md {
    text-align: left;
  }
  .card {
    display: block;
    min-height: 25em;
    @include md {
      display: grid;
      grid-template-columns: 2fr 1.5fr;
      grid-column-gap: 3em;
      border-radius: 20px;
    }
    .about {
      margin: 2em auto;
      padding: 0.95em;
      div {
        a {
          text-decoration: none;
          color: var(--title-color);
          background-color: var(--bg-button-color);
          border: 1px solid transparent;
          border-radius: 20px;
          padding: 0.3em 1.5em;
          display: inline-block;
          opacity: 1;
          margin-right: 1em;
          &:hover,
          &:active {
            opacity: 0.6;
            outline: 0;
            -webkit-transition: all 0.2s ease;
            transition: all 0.2s ease;
            box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.15);
          }
        }
      }
      @include md {
        width: 100%;
        padding: 4em;
      }
    }
    .image-container {
      clip-path: polygon(20% 0%, 100% 0, 100% 100%, 0% 100%);
        background: center / cover no-repeat url("../assets/images/me.png");
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      
    }
  }
}
</style>
