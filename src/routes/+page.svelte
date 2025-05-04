
<script lang="ts">
  import CuratorDescription from "./_music-selection/CuratorDescription.svelte";
  import MusicBody from "./_music-selection/MusicBody.svelte";
  import TopBar from "./TopBar.svelte";
  import VoteSection from "./_music-selection/VoteSection.svelte";
  import { BackendRequestBuilder, readStreamBody } from "../utils/tools";
  import type { TodaysSelection } from "../types/music";
  import { onMount } from "svelte";

  let carosuelPosition = $state(1);
  let todaysSelection: TodaysSelection | undefined = $state()
  let descriptionTitle: string = $state("");

  onMount(async () => {
    try {
        let response = await new BackendRequestBuilder().setEndpoint("/todaysMusic").sendUnAuthenticatedRequest()
        console.log(response)
        if (response.ok){
            todaysSelection = await response.json()
            todaysSelection!.MusicEntries = todaysSelection!.MusicEntries.sort((song1, song2) => {return song1.SongOrder - song2.SongOrder})
            descriptionTitle = "Why These Songs Where Chosen By " + todaysSelection?.CuratorName + ":"
        } else{
            defaultSongs()
        }
    } catch (error) {
        defaultSongs()
    }
  })

  async function defaultSongs(){
    let defaults = await fetch("default_songs.json")
    todaysSelection = await defaults.json()
    descriptionTitle = "There seems to be a problem with the server:"
    todaysSelection?.MusicEntries.sort((song1, song2) => {return song1.SongOrder - song2.SongOrder})
  }

// Paint like shaders
// https://codepen.io/DonKarlssonSan/embed/gROawd?default-tab=result#js-box
</script>


<section id="front-page">
    <TopBar></TopBar>

    <!-- Await block also gets SSR so with fetch, it proves to be a problem -->
    <!-- So if statement works better -->
    {#if todaysSelection}
        <CuratorDescription curatorDescription={todaysSelection.CuratorDescription} curatorName={todaysSelection.CuratorName} 
        descriptionTitle={descriptionTitle}></CuratorDescription>
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
