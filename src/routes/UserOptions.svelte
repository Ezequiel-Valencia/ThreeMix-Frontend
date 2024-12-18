<script lang="ts">
    let loggedIn = true;
    let username = "Ezequiel"
</script>


<section style="height:100%; width:100%;">
    {#if loggedIn}
        <div>
            <h1 style="font-size: x-large;">Hello {username}</h1>
            
            <button style="margin-top: 5%; padding-left:10%; padding-right:10%;" class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">Logout</button>
        </div>
    {:else}
        <div style="text-align: center;">
            <h1 style="font-size: x-large;">Please Login</h1>
            <form style="margin-top: 5%; margin-bottom:5%;">
                <div style="display: flex;">
                    <div style="text-align:left; padding-right:3%;" class="login-input">
                        <label style="font-size: 1.2em;" for="username">Username: </label>
                        <label style="font-size: 1.2em;" for="password">Password: </label>
                    </div>
                    <div class="login-input">
                        <input style="" id="username" type="email">
                        <input id="password" type="password">
                    </div>
                </div>
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
