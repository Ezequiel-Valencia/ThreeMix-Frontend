<script lang="ts">
  import { browser } from "$app/environment";
  import type { ZodIssue } from "zod";
  import { loginFormSchema, registerFormSchema, type User } from "../../../types/user";
  import { apiServer } from "../../../utils/config";
  import { getUserCache, type UserCache } from "./UserPreferences";
  import { readStreamBody } from "../../../utils/tools";

    let userCache: UserCache
    let user: User | null = $state(null)
    
    let httpError: string = $state("")
    if (browser){
        userCache = getUserCache()
        user = userCache.read()
    }
    let showLogin = $state(true)
    let validationErrors: ZodIssue[] = $state([])
    $effect(() => {
        showLogin
        httpError = ""
        validationErrors = []
    })

    async function sendForm(login: boolean){
        const form = document.querySelector(login ? "#login-form" : "#signup-form") as HTMLFormElement
        // https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_forms_through_JavaScript
        const formData = new FormData(form)
        console.log(formData)
        // https://stackoverflow.com/questions/71384018/typing-object-fromentriesnew-formdataform
        const validation = login ? loginFormSchema.safeParse(Object.fromEntries(formData)) : registerFormSchema.safeParse(Object.fromEntries(formData))
        
        if (validation.success){
            try{
                let apiURI = apiServer + (login ? "/login" : "/register")
                validationErrors = []
                const response = await fetch(apiURI, {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                })
                if (response.ok){
                    user = await response.json()
                    userCache.setUser(user as User)
                    httpError = ""
                    window.location.replace("/")
                } else {
                    httpError = await readStreamBody(response.body as ReadableStream)
                }
            } catch (e){
                httpError = "Unable to login"
                console.error(e)
            }
        } else {
            validationErrors = validation.error.errors
        }
    }
</script>

{#snippet showError(err: string)}
    <div style="min-height: 2vh; background-color:rgba(118, 118, 118, 0.11); max-width: 30vw; border-width:2px; border-radius:8px; border-color:red; margin:3%;">
        <p style="max-width: 30vw;">{err}</p>
    </div>
{/snippet}

<div style="text-align: center;">
    <h1 style="font-size: x-large;">{showLogin ? "Please Login": "Please Sign Up"}</h1>
    {#if showLogin}
        <script lang="ts">clearErrors()</script>
        <form id="login-form" style="margin-top: 5%; margin-bottom:5%;">
            <div style="display: flex;">
                <div style="text-align:left; padding-right:3%;" class="login-input">
                    <label class="login-label" for="email">Email: </label>
                    <label class="login-label" for="password">Password: </label>
                </div>
                <div class="login-input">
                    <input id="email" type="email" name="email">
                    <input id="password" type="password" name="password">
                </div>
            </div>
            {#each validationErrors as err}
                {@render showError(err.message)}
            {/each}
            {#if httpError != ""}
                {@render showError(httpError)}
            {/if}
            <button onclick={() => {sendForm(true)}} style="margin-top: 5%; padding-left:10%; padding-right:10%;" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" type="submit">Login</button>
        </form>
    {:else}
        <script lang="ts">httpError = ""; validationErrors = []</script>
        <form id="signup-form" style="margin-top: 5%; margin-bottom:5%;">
            <div style="display: flex;">
                <div style="text-align:left; padding-right:3%;" class="login-input">
                    <label class="login-label" for="username">Username: </label>
                    <label class="login-label" for="email">Email: </label>
                    <label class="login-label" for="password">Password: </label>
                </div>
                <div class="login-input">
                    <input id="username" type="text" name="username">
                    <input id="email" type="email" name="email">
                    <input id="password" type="password" name="password">
                </div>
            </div>
            {#each validationErrors as err}
                {@render showError(err.message)}
            {/each}
            {#if httpError != ""}
                {@render showError(httpError)}
            {/if}
            <button onclick={() => {sendForm(false)}} style="margin-top: 5%; padding-left:10%; padding-right:10%;" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" type="submit">Sign Up</button>
        </form>
    {/if}
    <button onclick={() => {showLogin = !showLogin}} id="sign-up">{showLogin ? "Show Sign Up": "Show Login"}</button>
</div>



<style lang="scss">
    .login-input{
        display: grid;
        grid-row: 3;
    }

    .login-label{
        font-size: 1.2em;
    }

    input{
        background-color: rgb(250, 227, 184);
        height: 1.5em;
    }

    #sign-up{
        font-size: medium;
        text-decoration-color: black;
        text-decoration-line: underline;
        padding-top: 5%;
    }

</style>


