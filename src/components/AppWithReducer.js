import React, { useReducer, useEffect } from 'react'
import _ from 'lodash'
import { get } from 'axios'

import Header from './Header'
import Movie from './Movie'
import Search from './Search'

import './app.css'

const API_KEY = `afe723ab`

const movieFetcher = (
  search = `man`,
  api = API_KEY,
  url = `https://www.omdbapi.com/`
) => `${url}?s=${search}&apikey=${api}`

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
      }
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      }
    default:
      return state
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    get(movieFetcher()).then(({ data }) =>
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: data.Search,
      })
    )
  }, [])

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    })
    get(movieFetcher(searchValue)).then(({ data }) => {
      if (data.Response === 'True') {
        console.log('data', data)
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: data.Search,
        })
      } else {
        dispatch({
          type: 'SEARCH_MOVIES_FAILURE',
          error: data.Error,
        })
      }
    })
  }

  const { movies, errorMessage, loading } = state

  return (
    <div className="app">
      <Header text="REACT HOOKS MOVIES" />
      <Search search={search} />
      <p className="app-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          _.map(movies, (movie, i) => (
            <Movie key={`${i}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}
export default App
