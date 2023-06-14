<script>

  import { onMount } from "svelte";
  import { scores } from '../stores.js';
  import axios from "axios";
  import Country from "./Country.svelte";
  let countries = [];
  let currentCountry = null;
  let nextCountry = null;
  export let gameType;
  let loadingCountry = false;
  let loadingAtStart = true;
  let gameOver = false;
  let currentScore = 0;

  $: gameOver && updateHighscore(gameType, currentScore);

  function updateHighscore(gameType, obtainedScore) {
    if ($scores[gameType] < obtainedScore) {
      $scores[gameType] = obtainedScore;
    }
  }

  async function fetchCountries() {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    countries = response.data;
    currentCountry = await getRandomCountry();

    nextCountry = await getRandomCountry();
    loadingAtStart = false;
  }


  async function getRandomCountry() {
    loadingCountry = true;
    let randomIndex = Math.floor(Math.random() * countries.length);
    let country = countries[randomIndex];

    const response = await axios.get('https://api.api-ninjas.com/v1/country', {
      headers: {
        'X-Api-Key': 'gUyIYCejJHJIptUQ+tUqng==aiyGVyhfOfT0vlp8'
      },
      params: {
        name: country.name.common
      }
    });

    if (response.data.length === 0) {
      return await getRandomCountry();
    }
    country.infant_mortality = response.data[0].infant_mortality;
    country.gdp = response.data[0].gdp;
    country.unemployment = response.data[0].unemployment;

    loadingCountry = false;
    return country;
  }

  async function playGame(higher) {
    let comparisonValueCurrent, comparisonValueNext;
    comparisonValueCurrent = currentCountry[gameType];
    comparisonValueNext = nextCountry[gameType];
    if (
      (higher && comparisonValueNext > comparisonValueCurrent) ||
        (!higher && comparisonValueNext < comparisonValueCurrent)
    ) {
      currentScore++;
      currentCountry = nextCountry;
      nextCountry = await getRandomCountry();
    } else {
      gameOver = true;
    }

  }

  onMount(fetchCountries);
</script>


<div class="game">
  {#if !loadingAtStart}
    <div class="game-container">
      <h2>{gameType}</h2>
      <div class="countries">
        <Country country={currentCountry} {gameType} isCurrentCountry={true} {playGame}/>
        <div class="vs">vs</div>
        {#if gameOver}
          <Country country={nextCountry} {gameType} isCurrentCountry={true} {playGame}/>
        {:else}
          {#if loadingCountry}
            <div class="country">
              <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="loading" />
              <h3>Loading...</h3>
            </div>
          {:else}
            <Country country={nextCountry} {gameType} isCurrentCountry={false} {playGame}/>
          {/if}
        {/if}
      </div>
    </div>
    {#if gameOver}
      <h2>Game Over</h2>
      <h3>Score: {currentScore}</h3>
      <button on:click={() => window.location.reload()}>Return to menu</button>
    {:else}
      <h2>Score: {currentScore}</h2>
    {/if}
  {:else}
    <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="loading" />
    <h2>Loading...</h2>
  {/if}
</div>

<style>
  img {
    width: 200px;
  }
  .game {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
  }
  .countries {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    flex-wrap: wrap;
  }

  .country{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .vs {
    width: 100px;
    height: 100px;
    background-color: lightblue;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #fff;
    margin: 0 20px;
    margin-bottom: 30px;
  }

  h2 {
    color: #edf2f4;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 30px;
    text-transform: uppercase;
  }

  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }

  @media (max-width: 660px) {
    /* Media query for screens with a maximum width of 600px */
    .countries {
      flex-direction: column; /* Change the flex direction to column */
    }
  }
</style>
