
<script lang="ts">
  import CuratorDescription from "./_music-selection/CuratorDescription.svelte";
  import MusicBody from "./_music-selection/MusicBody.svelte";
  import TopBar from "./TopBar.svelte";
  import VoteSection from "./_music-selection/VoteSection.svelte";

  let carosuelPosition = $state(1);

  let todaysSelection = {
    curatorName: "Ezequiel",
    curatorDescription: "Here is the reason why this curator chose this set of songs. It's important to them for these particular reasons, and such.",
    musicEntries: [
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
  }

// Paint like shaders
// https://codepen.io/DonKarlssonSan/embed/gROawd?default-tab=result#js-box
</script>


<section id="front-page">
    <TopBar></TopBar>
    <CuratorDescription curatorDescription={todaysSelection["curatorDescription"]} curatorName={todaysSelection["curatorName"]}></CuratorDescription>
    <MusicBody musicEntries={todaysSelection["musicEntries"]} bind:carosuelPosition={carosuelPosition}></MusicBody>
    <VoteSection musicEntries={todaysSelection["musicEntries"]} bind:carosuelPosition={carosuelPosition}></VoteSection>
</section>


<style lang="scss">
    #front-page{
        background-color: rgb(255, 251, 246);
        height: 100%;
        min-height: 100vh;
        width: 100vw;
    }
</style>
