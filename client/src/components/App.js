import React, { useState } from "react";
import "./App.css";
import Search from "./Search";
import MovieList from "./MovieList";


function App() {

  const [movieList, setMovieList] = useState([{"Title":"The Great Day on the Beach","Year":"1991","Rated":"N/A","Released":"19 Sep 1991","Runtime":"100 min","Genre":"Comedy, Drama, Family","Director":"Stellan Olsson","Writer":"Palle Fischer, Stellan Olsson, Søren Skjær","Actors":"Erik Clausen, Nina Gunke, Benjamin Rothenborg Vibe","Plot":"Copenhagen 1930. Through the eyes of a boy, his family and the outside world is depicted. A well knit, working class family. The boy has great expectations on his father. This leads to the involuntary unmasking of the father.","Language":"Danish, Swedish","Country":"Denmark, Sweden","Awards":"4 wins","Poster":"https://m.media-amazon.com/images/M/MV5BZWQ4Njc0MGYtOGY5NC00YWNiLTg5MTMtY2ZiYmY4Zjk5MWM2XkEyXkFqcGdeQXVyMjM3ODA2NDQ@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.7/10"}],"Metascore":"N/A","imdbRating":"6.7","imdbVotes":"665","imdbID":"tt0102986","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}]);

  const addMovieHandler = (movieData) => {
    setMovieList((prevState) => {
      return [...prevState, movieData]
    })
  }

  return (
    <div className="App">
      <h1>Search for your Movie</h1>
      <Search onAddMovie={addMovieHandler}></Search>
        <MovieList onMovieList={movieList} onSetMovieList={setMovieList}></MovieList>
    </div>
  );
}

export default App