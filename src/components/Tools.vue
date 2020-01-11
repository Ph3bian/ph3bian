<template>
    <div class="Tools">
        <h2>Tools</h2>
        <div class="ToolsContainer">
            <span class="badge">HTML</span>
            <span class="badge">CSS</span>
            <span class="badge">SCSS</span>
            <span class="badge">JAVASCRIPT</span>
            <span class="badge">REACT</span>
            <span class="badge">VUE</span>
            <span class="badge">ANGULARJS</span>
            <span class="badge">ANGULAR</span>
            <span class="badge">GATSBY</span>
            <span class="badge">GRIDSOME</span>
            <span class="badge">ADONISJS</span>
            <span class="badge">JEST</span>
            <span class="badge">NETLIFY</span>
            <span class="badge">HEROKU</span>
            <span class="badge">NESABOX</span>
            <span class="badge">GIT</span>
            <span class="badge">REDUX</span>
            <span class="badge">VUEX</span>
            <span class="badge">MATERIAL DESIGN</span>
            <span class="badge">BOOTSTRAP</span>
            <span class="badge">UIKIT</span>
            <span class="badge">FUSIONCHARTS</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../assets/style/mixins';

.Tools {
    margin-top: 1em;
    justify-content: center;
    font-size: 1rem;
    text-align: center;
    h2 {
        margin: 3em auto 2em;
    }
    &Container {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .badge {
            padding: 0.8em 1em;
            text-transform: uppercase;
            border-radius: 20px;
            margin: 1em 0.5em;
            font-weight: bold;
            font-size: 0.7em;
            box-shadow: var(--box-shadow);
            min-width: 5em;
        }
    }
    @include md {
        &Container {
            justify-content: unset;
            .badge {
                margin: 1em;
            }
        }
    }
}
</style>
