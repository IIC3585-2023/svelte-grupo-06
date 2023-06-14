import { writable } from "svelte/store";

const highscores = {
  "population": 0,
  "area": 0,
  "infant_mortality": 0,
  "gdp": 0,
  "unemployment": 0
}

export const scores = writable(highscores);