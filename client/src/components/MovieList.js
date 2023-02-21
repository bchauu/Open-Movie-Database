import React, { useState, useEffect } from "react";
import { MovieCard } from "./cards/MovieCard";
import { Link } from 'react-router-dom';
import "./MovieList.css"

function MovieList(props) {
  const [years, setYears] = useState([]);
  const [movieByYear, setMovieByYear] = useState([]);
  const [isYearFilter, setIsYearFilter] = useState({filtered: false});
  const [movieByRating, setMovieByRating] = useState([])
  const [isRatingFilter, setIsRatingFilter] = useState({rate: false})
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
      props.onMovieList.forEach(movie => {
        if (!years.includes(movie.Year)) {
          setYears([...years, movie.Year])
        }
  
        if (!ratings.includes(movie.Ratings[0].Value.split('/')[0])) {
          setRatings([...ratings, movie.Ratings[0].Value.split('/')[0] ])
        }
  
      });
  }, [props.onMovieList])

  const sortHandler = (e) => {
      e.preventDefault();
    if (e.target.value === 'Date') {
      props.onSetMovieList([...props.onMovieList.sort((a,b) => a.Year - b.Year)])
    } else if (e.target.value === 'Title') {
      props.onSetMovieList([...props.onMovieList.sort((a,b) => {
        if (a.Title < b.Title) {
          return -1
        } else if (a.Title > b.Title) {
          return 1
        }
        return 0
      })])
    } else if (e.target.value === 'Rating') {
      props.onSetMovieList([...props.onMovieList.sort((a,b) => a.Ratings[0].Value.split('/')[0] - b.Ratings[0].Value.split('/')[0])])
    }
  }

  let currentYear;

  const yearFilterHandler = (e) => {
    e.preventDefault()
    if (currentYear !== e.target.value) {
      setMovieByYear([]);
    }
    props.onMovieList.forEach(movie => {
      if (movie.Year === e.target.value) {
        console.log(movie.Year, e.target.value)
        setMovieByYear((prevState) => {
          return [...prevState, movie]
        })
        setIsYearFilter([true]);

      }
    })
    if (e.target.value === 'Year') {
      setIsYearFilter([false])
    }
    console.log(isYearFilter[0])
  }

  let currentRating;

  const ratingFilterHandler = (e) => {
    e.preventDefault()
    if (currentRating !== e.target.value) {
      setMovieByRating([]);
    }
    props.onMovieList.forEach(movie => {
      if (movie.Ratings[0].Value.split('/')[0] === e.target.value) {
        console.log(movie.Ratings[0].Value.split('/')[0], e.target.value)
        setMovieByRating((prevState) => {
          return [...prevState, movie]
        })
        setIsRatingFilter([true]);
      }
    })
    if (e.target.value === 'Rating') {
      setIsRatingFilter([false])
    }
  }

  return (
    <div className="movie-section">
      <h2>Movies</h2>
      <div>
        <label>
          Sort
          <select onChange={sortHandler}>
            <option value="Select" >Select</option>
            <option value="Date" >Date</option>
            <option value="Title">Title </option>
            <option value="Rating">Rating </option>
          </select>
        </label>

        <label> 
          Filter by Year
          <select onChange={yearFilterHandler}>
            <option value="Year">Year</option>
            {years.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </select>
        </label>

        <label>
          Filter by Rating
          <select onChange={ratingFilterHandler}>
            <option value="Rating" >Rating</option>
            {ratings.map((rating) => (
              <option value={rating}>{rating}</option>
            ))}
          </select>
        </label>
      </div>
        {
          isYearFilter[0] && movieByYear
          ? <ul className="moviesList">
            {movieByYear.map((movie) => (
        <MovieCard key={movie.imdbID}>
            <ul  className="movie">
              <h2>{movie.Title}</h2>
              <div className="movie-info">
                <h4>Year:</h4>
                <p>{movie.Year}</p>
              </div>
              <div className="movie-info">
                <h4>Imdb Rating:</h4> 
                <p>{movie.Ratings[0].Value}</p> 
              </div>
                <h4>Plot:</h4>
                <p>{movie.Plot}</p>
                <Link to={`/movieDetails/${movie.imdbID}`} state={{ from: {Title: `${movie.Title}`, Ratings: `${movie.Ratings[0].Value}`, Year: `${movie.Year}`} }}>See More...</Link>
            </ul>
        </MovieCard>
            ))}
          </ul>
          : isRatingFilter[0] && movieByRating
          ? <ul className="moviesList">
            {movieByRating.map((movie) => (
            <MovieCard key={movie.imdbID}>
              <ul  className="movie">
                <h2>{movie.Title}</h2>
                <div className="movie-info">
                  <h4>Year:</h4>
                  <p>{movie.Year}</p>
                </div>
                <div className="movie-info">
                  <h4>Imdb Rating:</h4> 
                  <p>{movie.Ratings[0].Value}</p> 
                </div>
                  <h4>Plot:</h4>
                  <p>{movie.Plot}</p>
                  <Link to={`/movieDetails/${movie.imdbID}`} state={{ from: {Title: `${movie.Title}`, Ratings: `${movie.Ratings[0].Value}`, Year: `${movie.Year}`} }}>See More...</Link>
              </ul>
          </MovieCard>
            ))}
          </ul>
          : props.onMovieList[0]
          ? <ul className="moviesList">
          {props.onMovieList.map((movie) => (
            <MovieCard key={movie.imdbID} >
              <ul className="movie">
                <h2 className="movie-title">{movie.Title}</h2>
                <div className="movie-info">
                  <h4>Year:</h4>
                  <p>{movie.Year}</p>
                </div>
                <div className="movie-info">
                  <h4>Imdb Rating:</h4> 
                  <p>{movie.Ratings[0].Value}</p> 
                </div>
                  <h4>Plot:</h4>
                  <p>{movie.Plot}</p>
                  <Link to={`/movieDetails/${movie.imdbID}`} state={{ from: {Title: `${movie.Title}`, Year: `${movie.Year}`} }}>See More...</Link>
              </ul>
            </MovieCard>
          ))}
        </ul>
        : <MovieCard></MovieCard>
        }
    </div>
  );
}

export default MovieList