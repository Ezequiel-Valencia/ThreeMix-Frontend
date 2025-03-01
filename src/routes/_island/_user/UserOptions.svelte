<script lang="ts">
  import { browser } from "$app/environment";
  import { type User } from "../../../types/user";
  import { getShowCuratorNotes, getUserCache, type UserCache } from "./UserPreferences";
  import { BackendRequestBuilder, readStreamBody } from "../../../utils/tools";
  import UserForm from "./UserForm.svelte";
  import { apiServer } from "../../../utils/config";

    let userCache: UserCache
    let user: User | null = $state(null)
    let cc: any
    let showUserNotes = $state(true)
    
    let httpError: string = $state("")
    if (browser){
        cc = getShowCuratorNotes()
        userCache = getUserCache()
        user = userCache.read()
        showUserNotes = cc.read()
    }
    $effect(() => {
        cc.setBoolCuratorNotes(showUserNotes)
    })

    

    async function logout(){
        try{
            let backend = new BackendRequestBuilder()
            const resp = await backend.setEndpoint("/logout")
            .setMethod("POST").sendAuthenticatedRequest()
            if (typeof resp === "string"){
                httpError = resp
            } else if (resp.ok){
                httpError = ""
                userCache.delete()
                window.location.replace("/")
            } else{
                httpError = await readStreamBody(resp.body as ReadableStream)
            }
        } catch(e){
            httpError = "Unable to logout."
        }      
    }
    
</script>

{#snippet showError(err: string)}
    <div style="min-height: 2vh; background-color:rgba(118, 118, 118, 0.11); max-width: 30vw; border-width:2px; border-radius:8px; border-color:red; margin:3%;">
        <p style="max-width: 30vw;">{err}</p>
    </div>
{/snippet}

<section style="height:100%; width:100%;">
    {#if user != null}
        <div>
            <h1 style="font-size: x-large;">Hello {user.Username}</h1>
            {#if httpError != ""}
                {@render showError(httpError)}
            {/if}
            <div style="display:flex; width:100%;">
                <input bind:checked={showUserNotes} id="show-curator-notes" style="transform:scale(1.5);" type="checkbox"> 
                <label style="white-space:nowrap; padding-left:4%;" for="show-curator-notes">Show curator reason for song selection?</label>
            </div>
            {#if user.Role == "Unlimited" || user.Role == "TrustedCurator" 
            || user.Role == "Curator" || user.Role == "OneSubmission"}
                <button style="font-size: medium; text-decoration-color: black; text-decoration-line: underline; padding-top: 5%;"
                onclick={() => {window.open(apiServer.split("/api")[0] + "/curatorPage")}}>
                    Curator Page
                </button>
                <br>
            {/if}
            <button onclick={logout} style="margin-top: 5%; padding-left:10%; padding-right:10%;" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">Logout</button>
        </div>
    {:else}
        <UserForm></UserForm>
    {/if}

</section>


<style lang="scss">

    h1, label{
        color: black;
    }
</style>
