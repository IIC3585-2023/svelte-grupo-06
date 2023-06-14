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
    color: #edf2f4;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 40px;
    text-transform: uppercase;
    text-align: center;
  }
  
  table, th, td {
    border: 3px solid #edf2f4;
    border-collapse: collapse;
  }

  table {
    background-color: #ef233c;
  }

  th, td {
    text-align: center;
    width: 10vw;
    color: #edf2f4;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 20px;
  }

  .games-scores {
    display: flex;
    justify-content: center;
  }
</style>