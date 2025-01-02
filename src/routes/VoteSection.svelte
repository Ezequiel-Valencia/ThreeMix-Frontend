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
    <button type="submit" style="text-align: center;" 
    class="vote-button">Vote</button>
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

        /* 4 */
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
