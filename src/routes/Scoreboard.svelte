<script>
  import { scores } from '../stores.js';

  let scoreboard;
  scores.subscribe(value => scoreboard = value);
</script>

<h2>Highscores</h2>
<div class="games-scores">
  {#if scoreboard}
    <table>
      <tr>
        {#each Object.entries(scoreboard) as [gameType, gameScore]}
          <th>{ gameType.charAt(0).toUpperCase() + gameType.slice(1) }</th>
        {/each}
      </tr>
      <tr>
        {#each Object.entries(scoreboard) as [gameType, gameScore]}
          <td>{ gameScore }</td>
        {/each}
      </tr>
    </table>
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style>
  h2 {
    text-align: center;
  }
  
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td {
    text-align: center;
    width: 10vw;
  }

  .games-scores {
    display: flex;
    justify-content: center;
  }
</style>