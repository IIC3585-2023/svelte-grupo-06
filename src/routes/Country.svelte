<script>
  export let country;
  export let gameType;
  export let isCurrentCountry;
  export let playGame;

  function getReadableNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
</script>

<div class="country">  
  <img src={country.flags.png} alt={country.name.common} />
  <h3>{country.name.common}</h3>
  {#if isCurrentCountry}
    <p>has {getReadableNumber(country[gameType])}</p>
  {/if}
  {#if !isCurrentCountry}
    <div class="high-low">
      <div id="lower" on:click={() => playGame(false)}>Lower</div>
      <div id="higher" on:click={() => playGame(true)}>Higher</div>
    </div>
  {/if}
</div>


<style>
  h3 {
    color: #edf2f4;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 20px;
    text-transform: uppercase;
  }

  p {
    color: #edf2f4;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
  }

  .country{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 180px;
    width: 250px;
  }

  .high-low {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .high-low div {
    padding: 5px 10px;
    background-color: lightblue;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    margin: 5px 20px;
    cursor: pointer;
  }

  .high-low div:hover {
    transform: scale(1.1);
  }

  .high-low #higher {
    background-color: green;
  }

  .high-low #lower {
    background-color: red;
  }

  .country img {
    width: 180px;
    height: 100px;
  }
</style>

