<script>
  import { onMount } from "svelte";
  import axios from "axios";
  // import request from 'request';

  let countries = [];
  let currentCountry = null;
  let nextCountry = null;

  async function fetchCountries() {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    countries = response.data;
    // for (let i = 0; i < countries.length; i++) {
    //   const apiResponse = await axios.get('https://api.api-ninjas.com/v1/country', {
    //     headers: {
    //       'X-Api-Key': 'gUyIYCejJHJIptUQ+tUqng==aiyGVyhfOfT0vlp8'
    //     },
    //     params: {
    //       name: countries[i].name.common
    //     }
    // });
    //   console.log(apiResponse.data);
    //
    // }
    selectRandomCountry();
    const apiResponse = await axios.get('https://api.api-ninjas.com/v1/country', {
      headers: {
        'X-Api-Key': 'gUyIYCejJHJIptUQ+tUqng==aiyGVyhfOfT0vlp8'
      },
      // params: {
      //   name: 'United States'
      // }
    });
    console.log(apiResponse.data);
  }

  function selectRandomCountry() {
    let randomIndex = Math.floor(Math.random() * countries.length);
    currentCountry = countries[randomIndex];
    randomIndex = Math.floor(Math.random() * countries.length);
    nextCountry = countries[randomIndex];
  }

  function playGame(higher) {
    if (
      (higher && nextCountry.population > currentCountry.population) ||
      (!higher && nextCountry.population < currentCountry.population)
    ) {
      currentCountry = nextCountry;
      let randomIndex = Math.floor(Math.random() * countries.length);
      nextCountry = countries[randomIndex];
    } else {
      currentCountry = null;
    }
  }

  onMount(fetchCountries);
</script>

<style>
  img {
    width: 200px;
}
  .game {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
  }
</style>

{#if currentCountry}
  <div class="game">
    <div class="country">  <!-- hacer component -->
      <h3>{currentCountry.name.common}</h3>
      <p>has</p>
      <h4>{currentCountry.population}</h4>
      <img src={currentCountry.flags.png} alt={currentCountry.name.common} />
    </div>
    <div class="country">

      <h3>{nextCountry.name.common}</h3>
      <img src={nextCountry.flags.png} alt={nextCountry.name.common} />
      <div>
        <button on:click={() => playGame(false)}>Lower</button>
        <button on:click={() => playGame(true)}>Higher</button>
      </div>
    </div>
  </div>



{:else}
  <h2>Game Over</h2>
  <p>You lost! Refresh the page to play again.</p>
{/if}


