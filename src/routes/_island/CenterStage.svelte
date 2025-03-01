<script lang="ts">
    // 
  import { onMount } from 'svelte';
  import UserOptions from './_user/UserOptions.svelte';
  import Info from './_info/Info.svelte';
  import UserPastVotes from './_calendar/UserPastVotes.svelte';
    
    let { showPastVotes = $bindable(), 
      showUserOptions = $bindable(), showAboutInfo = $bindable(true) } = $props()

    onMount(() => {
      let chooseVoteDate = document.getElementById("center-stage") as HTMLElement;
      document.addEventListener("pointerup", (e) =>{
        if (e.target != null && e.target instanceof Node){
          if (showPastVotes){
            showPastVotes = chooseVoteDate.contains(e.target);
          } else if (showAboutInfo){
            showAboutInfo = chooseVoteDate.contains(e.target)
          }
          else{
            showUserOptions = chooseVoteDate.contains(e.target)
          }
        }
      })
    })
    // https://github.com/shadcn-ui/ui/pull/3997
    // https://stackoverflow.com/questions/78196878/how-can-i-make-my-calendar-occupy-the-half-of-my-website-using-shadcn
</script>


<section style="all:revert;
 z-index:3; text-align:center; position:absolute;
  height: 100vh; width:100vw; left:0; top:0; background-color: rgba(148, 145, 146, 0.9);">
    <div id="center-stage" style="">
        {#if showPastVotes}
          <UserPastVotes></UserPastVotes>
        {:else if showUserOptions}
          <UserOptions></UserOptions>
        {:else if showAboutInfo}
          <Info></Info>
        {/if}
    </div>
</section>

<!-- className={{
          months:
            "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
          month: "space-y-4 w-full flex flex-col",
          table: "w-full h-full border-collapse space-y-1",
          head_row: "",
          row: "w-full mt-2",
        }} -->

<style lang="scss">
  #center-stage{
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 5%;
    padding-right: 5%;
    position:absolute; 
    background-color: white; 
    top:50%; 
    left:50%; 
    transform: translate(-50%, -50%);
    border-radius: 10px;
  }

</style>
