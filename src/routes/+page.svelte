
<script lang="ts">
  import CuratorDescription from "./_music-selection/CuratorDescription.svelte";
  import MusicBody from "./_music-selection/MusicBody.svelte";
  import TopBar from "./TopBar.svelte";
  import VoteSection from "./_music-selection/VoteSection.svelte";
  import { nonAuthenticatedRequest, readStreamBody } from "../utils/tools";
  import type { TodaysSelection } from "../types/music";
  import { onMount } from "svelte";

  let carosuelPosition = $state(1);
  let todaysSelection: TodaysSelection | undefined = $state()

  onMount(async () => {
    let response = await nonAuthenticatedRequest("/todaysMusic")
    todaysSelection = await response.json()
  })

// Paint like shaders
// https://codepen.io/DonKarlssonSan/embed/gROawd?default-tab=result#js-box
</script>


<section id="front-page">
    <TopBar></TopBar>

    <!-- Await block also gets SSR so with fetch, it proves to be a problem -->
    <!-- So if statement works better -->
    {#if todaysSelection}
        <CuratorDescription curatorDescription={todaysSelection.CuratorDescription} curatorName={todaysSelection.CuratorName}></CuratorDescription>
        <MusicBody musicEntries={todaysSelection.MusicEntries} bind:carosuelPosition={carosuelPosition}></MusicBody>
        <VoteSection musicEntries={todaysSelection.MusicEntries} bind:carosuelPosition={carosuelPosition}></VoteSection>  
    {:else}
        <p>Waiting for music selection</p>
    {/if}
</section>


<style lang="scss">
    #front-page{
        background-color: rgb(255, 251, 246);
        height: 100%;
        min-height: 100vh;
        width: 100vw;
    }
</style>
