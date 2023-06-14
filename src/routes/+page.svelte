<script>
  import { onMount } from "svelte";
  import { scores } from '../stores.js';
  import Game from "./Game.svelte";
  import Scoreboard from "./Scoreboard.svelte";

  let gameType = "population";  // New variable for tracking game type
  let loadingAtStart = true;
  let gameStarted = false;  

  function startGame() {
    gameStarted = true;
  }

  // Persist store taken from
  // https://steveolensky.medium.com/persist-your-svelte-store-between-page-refreshes-in-a-few-lines-of-code-8dc36fc926a6
  let savestore = false;
  $: if (savestore && $scores) {
    window.sessionStorage.setItem("store", JSON.stringify($scores))
  }
  onMount(async () => {
    let ses = window.sessionStorage.getItem("store")
      if (ses) {
        $scores = JSON.parse(ses)
      }
    savestore = true
  })
</script>


{#if gameStarted}
  <Game {gameType} />
{:else}
  <label for="gameType">Select Game Type:</label>
  <select bind:value={gameType} id="gameType">
    <option value="population">Population</option>
    <option value="area">Area</option>
    <option value="infant_mortality">Infant Mortality</option>
    <option value="gdp">GDP</option>
    <option value="unemployment">Unemployment</option>
  </select>
  <button on:click={startGame}>Start Game</button>
  <Scoreboard/>
  <p>Falta:</p>
  <ul>
    <li>Mejor CSS</li>
    <li>Mejor Loadings Animations</li>
    <li>Guardar y Mostrar Mejor puntaje de cada categoria</li>
    <li>Asegurarse que la página sea responsiva</li>
  </ul>
{/if}
