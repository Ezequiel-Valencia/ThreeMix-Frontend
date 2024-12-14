
<script lang="ts">
  import MusicBody from "./MusicBody.svelte";
import TopBar from "./TopBar.svelte";
</script>


<section id="front-page">
    <TopBar></TopBar>

    
        <MusicBody></MusicBody>
</section>


<style lang="scss">
    #front-page{
        background-color: rgb(255, 251, 246);
        height: 100vh;
        width: 100vw;
        display:grid;
    }
</style>
