const API_KEY = `afe723ab`

export const movieFetcher = (
  search = `man`,
  api = API_KEY,
  url = `https://www.omdbapi.com/`
) => `${url}?s=${search}&apikey=${api}`
