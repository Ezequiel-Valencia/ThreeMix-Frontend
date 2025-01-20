<script lang="ts">
  import { onMount } from "svelte";
    let carouselEntity: HTMLElement;
    let { musicEntries, carosuelPosition = $bindable(1) } = $props()
    onMount(() => {
        carouselEntity = document.getElementById("carousel") as HTMLElement
        document.addEventListener("keydown", (ev: KeyboardEvent) => {
            if (ev.key == "ArrowRight"){
                rightCarosuel()
            } else if (ev.key == "ArrowLeft"){
                leftCarosuel()
            }
        })
    })

    $effect(() => {changeEntryInCarosuel(carosuelPosition)})

    function leftCarosuel(){
        let i = carosuelPosition - 1
        changeEntryInCarosuel(i > -1 ? i : 0)
    }

    function rightCarosuel(){
        let i = carosuelPosition + 1
        changeEntryInCarosuel(i > musicEntries.length - 1 ? musicEntries.length - 1 : i)
    }

    function changeEntryInCarosuel(index: number){
        carosuelPosition = index;
        carouselEntity.style.setProperty("--position", "" + carosuelPosition);
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
        margin-left: auto; margin-right:auto; margin-bottom: 0;">
        <button class="side-button" onclick={(e) => {leftCarosuel()}}>
            <img
            style="margin:auto; height: 5vmin; padding-right:2vw; transform:rotate(180deg);" src="./right-arrow.svg" alt="left-arrow">
        </button>
        
        <div>
            <section id="carousel">
                {#each musicEntries as song, i}
                    <div
                    style="--offset: {i};
                    opacity: {Math.abs(carosuelPosition - i) > 1 ? 0 : 1};"
                    role="gridcell"
                    tabindex="{i}"
                    id="carousel-item-{i}"
                    onclick={(e) => {changeEntryInCarosuel(i)}}
                    onkeydown={(e) => {changeEntryInCarosuel(i)}}
                    class="carousel-item">
                        <iframe style="pointer-events: {i == carosuelPosition ? 'all' : 'none'}; width: 30vw; aspect-ratio:16 /9;" src="https://www.youtube.com/embed/{song.PathResource}" title={song.Title} referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <h2>{song.Title}</h2>
                        by
                        <p>{song.Artist}</p>
                    </div>
                {/each}
            </section>
            <hr style="height: .2em; background-color:rgba(125, 125, 125, 0.42);"/>
        </div>
       
        <button class="side-button" onclick={(e) => {rightCarosuel()}}>
            <img
            style=" margin:auto; height: 5vmin; padding-right:2vw;" src="./right-arrow.svg" alt="right-arrow">
        </button>
        
    </main>
</section>


<style lang="scss">
    #music-body-section{
        justify-content: center;
        align-items: center;
        text-align: center;
        height:min-content;
    }

    #carousel{
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
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

