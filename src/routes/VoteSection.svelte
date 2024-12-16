<script lang="ts">
    let { musicEntries, carosuelPosition = $bindable(1) } = $props()

    let selectedOption = $state(1)

    $effect(() => {selectedOption = carosuelPosition})
    $effect(updateCarosuelPosition)

    function updateCarosuelPosition(){
        carosuelPosition = selectedOption;
    }

    function handleVoteSubmit(e: Event){

    }

</script>


<form onsubmit={handleVoteSubmit} id="vote-form">
    <label for="best-song"><u>Which Song is Your Favorite</u></label>
    <select bind:value={selectedOption} onchange={updateCarosuelPosition} id="best-song">
        {#each musicEntries as song, i}
            <option class="best-song-option" value={i} selected={selectedOption == i}>{song.title} by {song.artist}</option>
        {/each}
    </select>
    <button type="submit" style="text-align: center;" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Vote</button>
</form>


<style lang="scss">
    #vote-form{
        width: 100vw;
        text-align: center;
        justify-content: center;
        align-items: center;
        display: grid;
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
