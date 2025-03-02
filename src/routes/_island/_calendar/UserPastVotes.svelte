<script lang="ts">
    import { browser } from "$app/environment";
    import { type User } from "../../../types/user";
    import { BackendRequestBuilder, readStreamBody } from "../../../utils/tools";
    import { getUserCache, type UserCache } from "../_user/UserPreferences";
    import type { PastVote } from "../../../types/music";
    import { onMount } from "svelte";
  
      let userCache: UserCache
      let user: User | null = $state(null)

      let pastVotes: PastVote[] | undefined = $state()
      
      let httpError: string = $state("")
      if (browser){
          userCache = getUserCache()
          user = userCache.read()
      }  
      
      async function userPastVotes(){
          try{
              let backend = new BackendRequestBuilder()
              const resp = await backend.setEndpoint("/pastVotes")
              .setMethod("GET").sendAuthenticatedRequest()
              if (typeof resp === "string"){
                  httpError = resp
              } else if (resp.ok){
                  httpError = ""
                  pastVotes = await resp.json()
              } else{
                  httpError = await readStreamBody(resp.body as ReadableStream)
              }
          } catch(e){
              httpError = "Unable to logout."
          }      
      }

      onMount(userPastVotes)
      
  </script>
  
  {#snippet showError(err: string)}
      <div style="min-height: 2vh; background-color:rgba(118, 118, 118, 0.11); max-width: 30vw; border-width:2px; border-radius:8px; border-color:red; margin:3%;">
          <p style="max-width: 30vw;">{err}</p>
      </div>
  {/snippet}
  
  <section style="height:100%; width:100%;">
    <div>
        <h2>Past Votes</h2>
        {#if httpError != ""}
            {@render showError(httpError)}
        {/if}
        
        {#if pastVotes != undefined}
            <div class="scrollable-container">
                {#each pastVotes as pv, i}
                    <p>On {new Date(pv.Date).toLocaleDateString()}, you voted for 
                        <a href={pv.SongURL}>{pv.Title} by {pv.Artist}</a>
                    </p>
                    {#if i != pastVotes.length - 1}
                        <hr>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
  
  </section>
  
  
  <style lang="scss">
    .scrollable-container {
        max-width: 60vw;
        margin: auto;
        min-height: 300px;
        overflow-y: auto;
    }
    a {
        color: #4c74af;
        text-decoration: none;
        font-weight: bold;
    }
    a:hover {
        text-decoration: underline;
    }
    hr{
        margin-top: 2vh;
        margin-bottom: 2vh;
        border-width: 1px;
        border-color: black;
        color: black;
    }
    h2{
        font-size: x-large;
        font-weight: 500;
    }
  </style>
  