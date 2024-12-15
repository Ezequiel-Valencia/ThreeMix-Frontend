<script lang="ts">
  import { onMount } from "svelte";
    let position = $state(2)

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
    onMount(() => {
        carouselEntity = document.getElementById("carousel") as HTMLElement
    })

    function changeEntryInCarosuel(e: Event, index: number){
        position = index + 1;
        carouselEntity.style.setProperty("--position", "" + position);
        let carosulItem = document.getElementById("carousel-item-" + index)
        
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
    <main id="carousel">
        {#each musicEntries as song, i}
            <div
            style="--offset: {i + 1};
            opacity: {Math.abs(position - (i + 1)) > 1 ? 0 : 1}"
            id="carousel-item-{i}"
            class="carousel-item">
                <iframe src="https://www.youtube.com/embed/{song.pathResource}" title={song.title} referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <h2>{song.title}</h2>
                by
                <p>{song.artist}</p>
            </div>
        {/each}
    </main>
    <div id="radio-buttons">
        {#each musicEntries as song, i}
            <input
            onchange={(e) => {changeEntryInCarosuel(e, i)}} 
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
        height: 20vh;
        transform-style: preserve-3d;
        overflow: hidden;
        perspective: 600px;
        --position: 2;
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

</style>

