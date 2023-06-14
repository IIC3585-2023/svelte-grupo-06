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
              <!-- <img src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif" alt="loading" /> -->
              <h3>Loading...</h3>

              <div class="loader"></div>
            </div>
          {:else}
            <Country country={nextCountry} {gameType} isCurrentCountry={false} {playGame}/>
          {/if}
        {/if}
      </div>
    </div>
    {#if gameOver}
      <h2 class="game-over">Game Over</h2>
      <h3>Score: {currentScore}</h3>
      <button class="return-button" on:click={() => window.location.reload()}>Return to menu</button>
    {:else}
      <h2>Score: {currentScore}</h2>
    {/if}
  {:else}
              <h3>Loading...</h3>
              <div class="loader"></div>
  {/if}
</div>

<style>
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 80;
  height: 80;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


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

  h2, h3 {
    color: #edf2f4;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 40px;
    text-transform: uppercase;
  }

  .game-over {
    color: red;
  }

  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }

  /* CSS button 5: https://getcssscan.com/css-buttons-examples */ 
  .return-button {
    align-items: center;
    background-clip: padding-box;
    background-color: #fa6400;
    border: 1px solid transparent;
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
  }

  .return-button:hover,
  .return-button:focus {
    background-color: #fb8332;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  .return-button:hover {
    transform: translateY(-1px);
  }

  .return-button:active {
    background-color: #c85000;
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }

  @media (max-width: 660px) {
    /* Media query for screens with a maximum width of 600px */
    .countries {
      flex-direction: column; /* Change the flex direction to column */
    }
  }
</style>
