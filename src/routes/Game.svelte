<script>

  import { onMount } from "svelte";
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
    {#if gameOver}
      <h2>Game Over</h2>
      <h3>Score: {currentScore}</h3>
      <button on:click={() => window.location.reload()}>Play Again</button>
    {:else}
      <h2>Score: {currentScore}</h2>
    {/if}
  {:else}
    <h2>Loading</h2>
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
  }

  .country{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
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
  }

</style>
