<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let gameType = "population";  // New variable for tracking game type
  let loadingAtStart  = true;
  let gameStarted = false;  

  import Game from "./Game.svelte";
  function startGame() {
    gameStarted = true;
  }
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
  <button on:click={startGame} >Start Game</button>  
  <p>Falta:</p>
  <ul>
    <li>Mejor CSS</li>
    <li>Mejor Loadings Animations</li>
    <li>Guardar y Mostrar Mejor puntaje de cada categoria</li>
    <li>Asegurarse que la página sea responsiva</li>
  </ul>
{/if}
