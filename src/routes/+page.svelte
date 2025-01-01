
<script lang="ts">
  import CuratorDescription from "./CuratorDescription.svelte";
import MusicBody from "./MusicBody.svelte";
import TopBar from "./TopBar.svelte";
  import VoteSection from "./VoteSection.svelte";

  let carosuelPosition = $state(1);

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
// Paint like shaders
// https://codepen.io/DonKarlssonSan/embed/gROawd?default-tab=result#js-box
</script>


<section id="front-page">
    <TopBar></TopBar>
    <CuratorDescription></CuratorDescription>
    <MusicBody musicEntries={musicEntries} bind:carosuelPosition={carosuelPosition}></MusicBody>
    <VoteSection musicEntries={musicEntries} bind:carosuelPosition={carosuelPosition}></VoteSection>
</section>


<style lang="scss">
    #front-page{
        background-color: rgb(255, 251, 246);
        height: 100%;
        width: 100vw;
    }
</style>
