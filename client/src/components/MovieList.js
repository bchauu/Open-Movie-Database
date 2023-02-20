// import React, { useState, useEffect } from "react";
// import "./App.css";
import { MovieCard } from "./cards/MovieCard";
import { Link } from 'react-router-dom';


function MovieList(props) {
  console.log(props.onMovieList)

  const sortHandler = (e) => {
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
        <ul>
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
      </p>
    </div>
  );
}

export default MovieList