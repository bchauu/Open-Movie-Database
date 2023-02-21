import React, { useState, useEffect } from "react";
// import "./App.css";
import { MovieCard } from "./cards/MovieCard";
import { Link } from 'react-router-dom';


function MovieList(props) {
  // console.log(props.onMovieList[1].Ratings[0])
  // Ratings[0].Value.split('/')[0]

  const [years, setYears] = useState([]);
  const [movieByYear, setMovieByYear] = useState([]);
  const [isYearFilter, setIsYearFilter] = useState({filtered: false});
  const [movieByRating, setMovieByRating] = useState([])
  const [isRatingFilter, setIsRatingFilter] = useState({rate: false})
  // const yearCache = {  }; //not creating key/value and setting state at same time

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
    console.log(e.target.value)
    console.log(props.onMovieList)
  }

 

  let currentYear;

  const yearFilterHandler = (e) => {
    e.preventDefault()

    if (currentYear !== e.target.value) {
      setMovieByYear([]);
    }
    //movieByYear, setMovieByYear
    props.onMovieList.forEach(movie => {
      if (movie.Year === e.target.value) {
        console.log(movie.Year, e.target.value)
        setMovieByYear((prevState) => {
          return [...prevState, movie]
        })
        // setMovieByYear([...movieByYear, movie])
        setIsYearFilter([true]);

      }
    })

    console.log('filtered', movieByYear)
    console.log('all', props.onMovieList)

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
    //movieByYear, setMovieByYear
    props.onMovieList.forEach(movie => {
      if (movie.Ratings[0].Value.split('/')[0] === e.target.value) {
        console.log(movie.Ratings[0].Value.split('/')[0], e.target.value)
        setMovieByRating((prevState) => {
          return [...prevState, movie]
        })
        // setMovieByYear([...movieByYear, movie])
        setIsRatingFilter([true]);

      }
    })

    // console.log('filtered', movieByYear)
    // console.log('all', props.onMovieList)

    if (e.target.value === 'Rating') {
      setIsRatingFilter([false])
    }
    // console.log(isYearFilter[0])
  }


  return (
    <div>
      <h1>Search Result</h1>
      <p>
        All Movies Displayed
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
      </div>
      <div>
        <label> 
          Filter by Year
          <select onChange={yearFilterHandler}>
            <option value="Year">Year</option>
            {years.map((year) => (
              // <option>{year}</option>
              <option value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Filter by Rating
          <select onChange={ratingFilterHandler}>
            <option value="Rating" >Rating</option>
            {ratings.map((rating) => (
              // <option>{year}</option>
              <option value={rating}>{rating}</option>
            ))}
          </select>
        </label>
      </div>
        {
          isYearFilter[0] && movieByYear
          ? <ul>
            {movieByYear.map((movie) => (
              <MovieCard>
              <ul key={movie.imdbID}>
                  <h2>{movie.Title}</h2>
                  <p>Year</p>
                  <p>{movie.Year}</p>
                  <p>Plot</p>
                  <p>{movie.Plot}</p>
                  <p>Imdb Rating</p> 
                  <Link to={`/movieDetails/${movie.imdbID}`} state={{ from: {Title: `${movie.Title}`, Ratings: `${movie.Ratings[0].Value}`, Year: `${movie.Year}`} }}>See More...</Link>
                  <p>{movie.Ratings[0].Value}</p> 
              </ul>
              </MovieCard>
            ))}
          </ul>
          : isRatingFilter[0] && movieByRating
          ? <ul>
            {movieByRating.map((movie) => (
              <MovieCard>
              <ul key={movie.imdbID}>
                  <h2>{movie.Title}</h2>
                  <p>Year</p>
                  <p>{movie.Year}</p>
                  <p>Plot</p>
                  <p>{movie.Plot}</p>
                  <p>Imdb Rating</p> 
                  <Link to={`/movieDetails/${movie.imdbID}`} state={{ from: {Title: `${movie.Title}`, Ratings: `${movie.Ratings[0].Value}`, Year: `${movie.Year}`} }}>See More...</Link>
                  <p>{movie.Ratings[0].Value}</p> 
              </ul>
              </MovieCard>
            ))}
          </ul>
          :<ul>
          {props.onMovieList.map((movie) => (
            <MovieCard>
              <ul key={movie.imdbID}>
                  <h2>{movie.Title}</h2>
                  <p>Year</p>
                  <p>{movie.Year}</p>
                  <p>Plot</p>
                  <p>{movie.Plot}</p>
                  <p>Imdb Rating</p> 
                  <Link to={`/movieDetails/${movie.imdbID}`} state={{ from: {Title: `${movie.Title}`, Ratings: `${movie.Ratings[0].Value}`, Year: `${movie.Year}`} }}>See More...</Link>
                  <p>{movie.Ratings[0].Value}</p> 
              </ul>
            </MovieCard>
          ))}
        </ul>
          
        }
      </p>
    </div>
  );
}

export default MovieList