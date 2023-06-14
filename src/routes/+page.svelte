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
  <div class="wrapper">
    <div class="main-container">
      <img src="assets/masomenos.png" alt="Logo"/>
      <div class="red-strip">
        <label for="gameType">Select Game Type:</label>
      </div>
      <select bind:value={gameType} id="gameType">
        <option value="population">Population</option>
        <option value="area">Area</option>
        <option value="infant_mortality">Infant Mortality</option>
        <option value="gdp">GDP</option>
        <option value="unemployment">Unemployment</option>
      </select>
      <button on:click={startGame} id="start-button">Start Game</button>
    </div>
  </div>
  <Scoreboard/>
  <!-- <p>Falta:</p>
  <ul>
    <li>Mejor CSS</li>
    <li>Mejor Loadings Animations</li>
    <li>Guardar y Mostrar Mejor puntaje de cada categoria</li>
    <li>Asegurarse que la página sea responsiva</li>
  </ul> -->
{/if}


<style>
  select {
    background-color: #edf2f4;
    border: 0px solid #555;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    color: #333;
    width: 200px;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    justify-content: space-around; /* Center vertically */
    height: 50vh; /* Set the height to 100% of the viewport height */
    width: 60vh;
    padding: 3%;
    text-align: center;
    background-color: #8d99ae;
    border-radius: 30px;
    position: relative;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
  }
  img {
    width: 30vh;
    position: absolute;
    top: -20%;
  }

  #start-button {
    background-color: #ef233c;
    color: #edf2f4;
    height: 20%;
    width: 45%;
    border-radius: 20px;
    font-weight: 600;
  }
  .red-strip {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15%;
    background-color: #ef233c;
    color: #edf2f4;
    margin-top: 10%;
  }

  #gameType {
    text-align: center;
  }
</style>