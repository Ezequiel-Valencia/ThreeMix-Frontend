<script lang="ts">
  import { browser } from "$app/environment";
  import type { ZodError, ZodIssue } from "zod";
  import { userFormSchema } from "../types/user";
  import { apiServer } from "../utils/config";
  import { getShowCuratorNotes } from "./UserPreferences";
  import { readStreamBody } from "../utils/tools";

    let loggedIn = false;
    let username = "Ezequiel"
    let cc: any
    let showUserNotes = $state(true)
    let errors: ZodIssue[] = $state([])
    if (browser){
        cc = getShowCuratorNotes()
        showUserNotes = cc.read()
    }
    $effect(() => {
        cc.setBoolCuratorNotes(showUserNotes)
    })

    async function login(){
        const form = document.querySelector("#login-form") as HTMLFormElement
        // https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_forms_through_JavaScript
        const formData = new FormData(form)
        // https://stackoverflow.com/questions/71384018/typing-object-fromentriesnew-formdataform
        const validation = userFormSchema.safeParse(Object.fromEntries(formData))
        
        if (validation.success){
            try{
                errors = []
                const response = await fetch(apiServer + "/login", {
                    method: "POST",
                    body: formData
                })
                console.log(response)
                console.log(await readStreamBody(response.body as ReadableStream))
            } catch (e){
                console.error(e)
            }
        } else {
            errors = validation.error.errors
        }
    }
    
</script>

<section style="height:100%; width:100%;">
    {#if loggedIn}
        <div>
            <h1 style="font-size: x-large;">Hello {username}</h1>
            <div style="display:flex; width:100%;">
                <input bind:checked={showUserNotes} id="show-curator-notes" style="transform:scale(1.5);" type="checkbox"> 
                <label style="white-space:nowrap; padding-left:4%;" for="show-curator-notes">Show curator reason for song selection?</label>
            </div>
            <button style="margin-top: 5%; padding-left:10%; padding-right:10%;" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">Logout</button>
        </div>
    {:else}
        <div style="text-align: center;">
            <h1 style="font-size: x-large;">Please Login</h1>
            <form id="login-form" onsubmit={login} style="margin-top: 5%; margin-bottom:5%;">
                <div style="display: flex;">
                    <div style="text-align:left; padding-right:3%;" class="login-input">
                        <label style="font-size: 1.2em;" for="username">Username: </label>
                        <label style="font-size: 1.2em;" for="password">Password: </label>
                    </div>
                    <div class="login-input">
                        <input style="" id="username" type="text" name="username">
                        <input id="password" type="password" name="password">
                    </div>
                </div>
                {#each errors as err}
                    <p style="max-width: 30vw;">{err.message}</p>
                {/each}
                <button style="margin-top: 5%; padding-left:10%; padding-right:10%;" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" type="submit">Login</button>
            </form>
            <a href="/sign_up">Sign Up</a>
        </div>
    {/if}

</section>


<style lang="scss">
    .login-input{
        display: grid;
        grid-row: 2;
    }

    input{
        background-color: rgb(250, 227, 184);
        height: 1.5em;
    }

    h1, label, a{
        color: black;
    }

    a{
        font-size: medium;
        text-decoration-color: black;
        text-decoration-line: underline;
    }
</style>
