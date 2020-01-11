<template>
    <div class="history">
        <h2>Work History</h2>
        <div class="work">
            <div class="workCard">
                <h3>Kudi</h3>
                <p>Full Stack Developer</p>
                <p>July 2019 - Present</p>
            </div>
            <div class="workDescription">
                <p></p>
                <p>
                    I currently work at Kudi, a fintech company that provides
                    accessible and affordable financial services for all
                    Africans.
                </p>
            </div>
        </div>
        <div class="work">
            <div class="workCard">
                <h3>Softcom</h3>
                <p>Frontend Developer</p>
                <p>March 2018 - May 2019</p>
            </div>
            <div class="workDescription">
                <p></p>
                <p>
                    At Softcom Nigeria, I worked on the Eyowo team focused on
                    building solutions that manage payments. I also worked on
                    the NPOWER team that solved the challenge of managing
                    recruitment processes and people.
                </p>
            </div>
        </div>
        <div class="work">
            <div class="workCard">
                <h3>Seamfix</h3>
                <p>Frontend Developer</p>
                <p>July 2017 - Feb 2018</p>
            </div>
            <div class="workDescription">
                <p></p>
                <p>
                    Seamfix is popularly Known as the Identity Champions in
                    Nigeria, during my time there I worked on the company
                    website, BioRegistra, AutoTopUp and others.
                </p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../assets/style/mixins';

.history {
    margin-top: 1em;
    justify-content: center;
    font-size: 1rem;
    text-align: center;
    h2 {
        margin: 3em auto 2em;
    }
    .work {
        display: grid;
        grid-template-columns: 100%;
        grid-row-gap: 1em;
        justify-content: center;
        align-items: center;
        margin: 3em 0em;
        &Description {
            display: none;
        }
        &Card {
            position: relative;
            border-radius: 20px;
            background-color: var(--bg-button-color);
            color: var(--title-color);
            box-shadow: var(--box-shadow);
            margin: 2em auto;
            width: 100%;
            h3 {
                margin: 0.75em;
                a {
                    outline: none;
                    text-decoration: none;
                }
            }
        }
        @include md {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-column-gap: 0em;
            margin: 3em 4em;
            &Description {
                display: grid;
                margin: 1.5em auto;
                border-radius: 20px;
                background-color: transparent;
                grid-template-columns: 1fr 2fr;
                height: 9em;
                border-radius: 20px;
                align-items: center;
                text-align: left;
                padding: 1em;
            }
            &Card {
                padding: 1em;
                width: 15em;
                margin-right: -3em;
                z-index: 2;
            }
        }
    }
}
</style>
