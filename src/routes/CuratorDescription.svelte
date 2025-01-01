<script lang="ts">
     let showCuratorReason = $state(true)
</script>


{#if showCuratorReason}
    <section id="curator-description">
        <div style="display:flex; margin:auto; width: 90%; align-items:center; padding-top:1%; padding-bottom:1%;">
            <figure class="figures" style="align-items:center;">
                <img style="height:8vh;" alt="user-profile-pic" src="/user-circle.svg">
                <figcaption style="text-align: center;">
                    Bob
                </figcaption>
            </figure>
            <div style="padding-left: 5%;">
                <h3>
                    <em>
                        <u>Why These Songs Where Chosen By Bob:</u>
                    </em>
                </h3>
                <p>
                    Here is the reason why this curator chose this set of songs.
                    It's important to them for these particular reasons, and such.
                </p>
            </div>
        </div>
        <button onclick={() => {showCuratorReason = false}} style="font-size:x-large; position:absolute; top: 10px; right: 10px;">
            X
        </button>
    </section>
{/if}


<style lang="scss">
    #curator-description{
        position: relative;
        height: 100%;
        margin-top:5vh;
        width: 60vw;
        max-width: 1000px;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        background-color: rgba(128, 128, 128, 0.486);
        border-radius: 8px;
        border-color: black;
    }

    .figures{
        text-align: center;
        height: 100%;
        max-width:10vw;
        justify-content: center;
        align-items: center;
        position:relative;
    }

</style>
