import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { get } from 'axios'

import Header from './Header'
import Movie from './Movie'
import Search from './Search'

import { movieFetcher } from '../utils'

import './app.css'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    get(movieFetcher()).then(({ data }) => {
      setMovies(data.Search)
      setLoading(false)
    })
  }, [])
  const search = searchValue => {
    setLoading(true)
    setErrorMessage(null)
    get(movieFetcher(searchValue)).then(({ data }) => {
      if (data.Response === 'True') {
        setMovies(data.Search)
        setLoading(false)
      } else {
        setErrorMessage(data.Error)
        setLoading(false)
      }
    })
  }
  return (
    <div className="app">
      <Header text="REACT HOOKS MOVIES" />
      <Search search={search} />
      <p className="app-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) =>
            _.map(movies, (movie, i) => (
              <Movie
                key={`${index}-${movie.Title}-${movie.Year}`}
                movie={movie}
              />
            ))
          )
        )}
      </div>
    </div>
  )
}
export default App
