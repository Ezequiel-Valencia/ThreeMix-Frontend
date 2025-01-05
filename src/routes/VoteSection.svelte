<script lang="ts">
  import { onMount } from "svelte";
  import { getLastVoteDate, getUserCache, type UserCache, type VoteDecision } from "./UserPreferences";
  import { browser } from "$app/environment";
  import type { User } from "../types/user";

    let { musicEntries, carosuelPosition = $bindable(1) } = $props()

    let selectedOption = $state(1)
    let radioButtons: NodeListOf<HTMLInputElement>
    let lastVoteHandler: any
    let lastVote: VoteDecision
    let didTheyVoteToday: boolean = $state(false)
    let userCache: UserCache
    let user: User | null = $state(null)

    // Unlike onMount it does not have to wait for DOM
    if (browser){
        lastVoteHandler = getLastVoteDate()
        lastVote = lastVoteHandler.read()
        didTheyVoteToday = new Date(lastVote.dateUTC).getDate() == new Date().getDate()
        userCache = getUserCache()
        user = userCache.read()
        if (didTheyVoteToday){
            selectedOption = lastVote.number
        }
    }

    $effect(() => {
        if (!didTheyVoteToday){
            selectedOption = carosuelPosition
        }
    })
    $effect(updateCarosuelPosition)
    
    onMount(() => {
        radioButtons = document.querySelectorAll(".particles-checkbox") as NodeListOf<HTMLInputElement>
    })

    function updateCarosuelPosition(){
        carosuelPosition = selectedOption;
    }

    function setSelectedOption(j: number){
        selectedOption = j
        radioButtons[selectedOption].checked = true
    }

    function handleVoteSubmit(e: Event){
        lastVoteHandler.setVote({dateUTC: new Date().toUTCString(), number: selectedOption})
        didTheyVoteToday = true
    }

</script>


<form onsubmit={handleVoteSubmit} id="vote-form">
    <label style="font-size: xx-large; font-family: 'Times New Roman', Times, serif;" for="best-song"><u>Which Song is Your Favorite?</u></label>
    <div id="" style="display: grid;">
        {#each musicEntries as song, i}
            <button type="button" disabled={didTheyVoteToday} class="particles-checkbox-container" onclick={() => {setSelectedOption(i); updateCarosuelPosition()}} 
                style="justify-content: left; 
                background-color: {didTheyVoteToday && selectedOption == i ? "rgba(128, 128, 128, 0.4)": "transparent" };
                align-items:start; border-color: {i == selectedOption ? "black": ""}">
                <input disabled={didTheyVoteToday} checked={selectedOption == i} class="particles-checkbox" type="radio" name="music-choice" id="radion-button-{i}"/>
                <span>{song.title} by {song.artist}</span>
            </button>
        {/each}
    </div>
    {#if !didTheyVoteToday && user != null}
        <button disabled={didTheyVoteToday} type="submit" 
        style="text-align: center;" 
        class="vote-button">{didTheyVoteToday ? "Voted": "Vote"}</button>
    {:else if user == null}
        <div style="text-align: center;">
            <h2 style="font-size: x-large; margin:auto;">
                Login to cast a vote.
            </h2>
        </div>
    {/if}
</form>
{#if didTheyVoteToday}
    <div style="text-align: center;">
        <h2 style="font-size: x-large; margin:auto;">
            You've Voted For: {musicEntries[selectedOption].title} by {musicEntries[selectedOption].artist}
        </h2>
    </div>
{/if}


<style lang="scss">
    @use "radio-button.scss";
    #vote-form{
        width: 100vw;
        text-align: center;
        justify-content: center;
        align-items: center;
        display: grid;
        row-gap: 2vh;
        padding-bottom: 5vh;
    }
    #best-song{
        width: 30vw;
        max-width: 500px;
        text-align: center;
        justify-content: center;
        justify-self: center;
        align-items: center;
        border-radius: 5px;
        padding-top: 1vh;
        padding-bottom: 1vh;
    }

    .vote-button {
        position: relative;
        z-index: 2;
        line-height: 40px;
        padding: 0;
        border-color: black;
        border-width: 2px;
        border-style: solid;
    }
    .vote-button:hover{
        border: none;
        background-color: rgba(128, 128, 128, 0.199);
    }
    .vote-button:focus{
        background-color: gray;
    }
    .vote-button:before,
    .vote-button:after {
        position: absolute;
        content: "";
        width: 0%;
        height: 0%;
        border: 2px solid;
        z-index: -1;
        transition: all 0.3s ease;
    }
    .vote-button:before {
        top: 0;
        left: 0;
        border-bottom-color: transparent;
        border-right-color: transparent;
        border-top-color: #000;
        border-left-color: #000;
    }
    .vote-button:after{
        bottom: 0;
        right: 0;
        border-top-color: transparent;
        border-left-color: transparent;
        border-bottom-color: #000;
        border-right-color: #000;
    }

    .vote-button:hover:after{
        right: 5px;
    }

    .vote-button:hover:before,
    .vote-button:hover:after {
        padding-top: 5%;
        padding-bottom: 6%;
        border-color: #000;
        height: 100%;
        width: 100%;
    }

</style>
