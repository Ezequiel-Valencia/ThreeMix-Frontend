<script lang="ts">
  import { onMount } from "svelte";

    let musicEntries = [
        {
            title: "Tv Off",
            pathResource: "U8F5G5wR1mk"
        },
        {
            title: "Some",
            pathResource: "H58vbez_m4E"
        },
        {
            title: "Some",
            pathResource: "5WRqGfxGXBw"
        }
    ]
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
            <div class="carousel-item">
                <iframe src="https://www.youtube.com/embed/{song.pathResource}" title={song.title} referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        {/each}
    </main>
    <div id="radio-buttons">
        {#each musicEntries as song, i}
            {#if i == 1}
                <input class="radio-button" type="radio" name="music-choice" checked/>
            {:else}
                <input class="radio-button" type="radio" name="music-choice" />
            {/if}
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
    }

</style>

