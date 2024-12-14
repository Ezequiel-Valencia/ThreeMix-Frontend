<script lang="ts"></script>


<nav id="top-bar">
    <figure class="figures">
        <img style="height: 100%; padding-left: 2vw;" src="Calendar.svg" alt="Calendar">
        <figcaption style="padding-left: 2vw;">Calendar</figcaption>
    </figure>
    <h1 id="title-text">Three Mix</h1>
    <figure class="figures">
        <img style="height: 100%; padding-right:2vw;" src="user-circle.svg" alt="User">
        <figcaption style="padding-right: 2vw;">User</figcaption>
    </figure>
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
    }

    .figures{
        text-align: center;
        height: 100%;
    }

    .figures:hover{
        filter: invert(0.3);
        cursor: pointer;
    }

</style>
