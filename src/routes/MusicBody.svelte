<script lang="ts">
  import { onMount } from "svelte";
    let position = $state(1)

    let musicEntries = [
        {
            title: "Tv Off",
            artist: "Kendrick Lamar",
            pathResource: "U8F5G5wR1mk"
        },
        {
            title: "Not Like Us",
            artist: "Kendrick Lamar",
            pathResource: "H58vbez_m4E"
        },
        {
            title: "King Of Silence",
            artist: "Cibao Mattoo",
            pathResource: "5WRqGfxGXBw"
        }
    ]
    let carouselEntity: HTMLElement;
    let radioButtons: NodeListOf<HTMLInputElement>
    onMount(() => {
        carouselEntity = document.getElementById("carousel") as HTMLElement
        radioButtons = document.querySelectorAll(".radio-button") as NodeListOf<HTMLInputElement>
        document.addEventListener("keydown", (ev: KeyboardEvent) => {
            if (ev.key == "ArrowRight"){
                rightCarosuel()
            } else if (ev.key == "ArrowLeft"){
                leftCarosuel()
            }
        })
    })

    function leftCarosuel(){
        let i = position - 1
        changeEntryInCarosuel(i > -1 ? i : 2)
    }

    function rightCarosuel(){
        let i = (position + 1) % 3
        changeEntryInCarosuel(i)
    }

    function changeEntryInCarosuel(index: number){
        position = index;
        carouselEntity.style.setProperty("--position", "" + position);
        for(let i = 0; i < radioButtons.length; i++){
            radioButtons[i].checked = i == index;
        }
    }

</script>

<!-- https://www.youtube.com/watch?v=eLHSFxF0Z4U -->

<!-- 1. Have users submited the iframe copied from YouTube 
        a. Have to do checks on submissions that it indeed follows
        the template of what is expected.
        b. Need to create fuzzy testing to ensure all variances are 
    2. Parse the share link, then use youtubes IFrame API
        a. Ensure what users submit are a youtube domain, and that it follows the expected
        formatting of a YouTube share url.

        b. Parse that url into only the resource portion of the route, then save it
        in the DB

-->


<section id="music-body-section">
    <main style="display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin: auto;">
        <button class="side-button" onclick={(e) => {leftCarosuel()}}>
            <img
            style="margin:auto; height: 5vmin; padding-right:2vw; transform:rotate(180deg);" src="./right-arrow.svg" alt="left-arrow">
        </button>
        
        <section id="carousel">
            {#each musicEntries as song, i}
                <div
                style="--offset: {i};
                opacity: {Math.abs(position - i) > 1 ? 0 : 1};"
                role="gridcell"
                tabindex="{i}"
                id="carousel-item-{i}"
                onclick={(e) => {changeEntryInCarosuel(i)}}
                onkeydown={(e) => {changeEntryInCarosuel(i)}}
                class="carousel-item">
                    <iframe style=" pointer-events: {i == position ? 'all' : 'none'}; width:30vw; aspect-ratio:16 /9;" src="https://www.youtube.com/embed/{song.pathResource}" title={song.title} referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    <h2>{song.title}</h2>
                    by
                    <p>{song.artist}</p>
                </div>
            {/each}
        </section>
        <button class="side-button" onclick={(e) => {rightCarosuel()}}>
            <img
            style=" margin:auto; height: 5vmin; padding-right:2vw;" src="./right-arrow.svg" alt="right-arrow">
        </button>
        
    </main>
    <div id="radio-buttons">
        {#each musicEntries as song, i}
            <input
            onchange={(e) => {changeEntryInCarosuel(i)}} 
            class="radio-button" type="radio" name="music-choice" id="radion-button-{i}"/>
        {/each}
    </div>
</section>


<style lang="scss">
    #music-body-section{
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-bottom: 10vh;
    }

    .radio-button:hover{
        cursor: pointer;
    }

    #carousel{
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin: auto;
        width: 80vw;
        height: 40vh;
        transform-style: preserve-3d;
        overflow: hidden;
        perspective: 600px;
        --position: 1;
    }

    .carousel-item{
        text-align: center;
        position: absolute;
        --r: calc(var(--position) - var(--offset));
        --absr: abs(var(--r));

        transition: all 0.25s linear;

        transform: rotateY(calc(-25deg * var(--r)))
        translateX(calc(-40vw * var(--r)));

        z-index: calc(var(--position) - var(--absr));
    }

    .side-button{
        height: 50vh; 
        width:10vw;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

</style>

