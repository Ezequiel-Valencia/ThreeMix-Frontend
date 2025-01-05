<script lang="ts">
  import CenterStage from "./CenterStage.svelte";
  import { getUserCache, type UserCache } from "./UserPreferences";
  import { browser } from "$app/environment";
  import type { User } from "../types/user";

    let showPastVotes = $state(false);
    let showUserOptions = $state(false);
    let userCache: UserCache
    let user: User | null = $state(null)
    if (browser){
        userCache = getUserCache()
        user = userCache.read()
    }
</script>


<nav id="top-bar">
    <button onclick={() => {showPastVotes = !showPastVotes}}>
        <figure style="padding-left: 2vw;" class="figures">
            <img class="icons" src="Calendar.svg" alt="Calendar">
            <figcaption >Past Votes</figcaption>
        </figure>
    </button>

    <div style="text-align: center;">
        <h1 id="title-text">Three-Mix</h1>
        <em>
            <p style="font-family: 'Times New Roman', Times, serif;">Remixing the way new music is found.</p>
        </em> 
    </div>
    <button onclick={() => {showUserOptions = !showUserOptions}}>
        <figure style="padding-right:2vw;" class="figures">
            <img class="icons" src="user-circle.svg" alt="User">
            <figcaption>{user == null ? "Login" : user.Username}</figcaption>
        </figure>
    </button>

    {#if showPastVotes || showUserOptions}
        <CenterStage bind:showUserOptions={showUserOptions} bind:showPastVotes={showPastVotes}></CenterStage>
    {/if}

</nav>


<style lang="scss">
    #top-bar{
        height: 10vh;
        width: 100vw;
        background-color: transparent;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 2vh;
    }

    #title-text{
        font-size: xx-large;
        font-family: 'Times New Roman', Times, serif;
    }

    .icons{
        height: 100%;
        margin: auto;
    }

    .figures{
        text-align: center;
        height: 100%;
        max-width:10vw;
        justify-content: center;
        align-items: center;
        position:relative;
    }

    .figures:hover{
        filter: invert(0.3);
        cursor: pointer;
    }

</style>
