<script lang="ts">
  import { onMount } from "svelte";

    let { musicEntries, carosuelPosition = $bindable(1) } = $props()

    let selectedOption = $state(1)
    let radioButtons: NodeListOf<HTMLInputElement>


    $effect(() => {selectedOption = carosuelPosition})
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

    }

</script>


<form onsubmit={handleVoteSubmit} id="vote-form">
    <label style="font-size: xx-large; font-family: 'Times New Roman', Times, serif;" for="best-song"><u>Which Song is Your Favorite?</u></label>
    <!-- <select bind:value={selectedOption} onchange={updateCarosuelPosition} id="best-song">
        {#each musicEntries as song, i}
            <option class="best-song-option" value={i} selected={selectedOption == i}>{song.title} by {song.artist}</option>
        {/each}
    </select> -->
    <div id="" style="display: grid;">
        {#each musicEntries as song, i}
            <button class="particles-checkbox-container " onclick={() => {setSelectedOption(i); updateCarosuelPosition()}} 
                style="justify-content: left; align-items:start; border-color: {i == selectedOption ? "black": ""}">
                <input checked={selectedOption == i} class="particles-checkbox" type="radio" name="music-choice" id="radion-button-{i}"/>
                <span>{song.title} by {song.artist}</span>
            </button>
        {/each}
    </div>
    <button type="submit" style="text-align: center;" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Vote</button>
</form>


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
</style>
