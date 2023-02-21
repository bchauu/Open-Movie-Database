import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import MovieDetailCard from './cards/MovieDetailCard';
import { Link } from 'react-router-dom';
import './MovieDetails.css';


function MovieDetails(props) {

  const location = useLocation();
  const { from } = location.state;
  const movie = from;

  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?t=${movie.Title}&y=${movie.Year}&plot=full&apikey=917b056f`)
    .then((res) => res.json())
    .then((data) => setMovieDetail(data));
  }, [])

  console.log(movieDetail);

  return (
    <div className="border">
    <MovieDetailCard>
      <div className="movieDetailsPage" >
        <h1>Movie Details</h1>
        <div>
          <h2>{movieDetail.Title}</h2>
        </div>
        <div className='details'>
          <img src={movieDetail.Poster} alt='new'/>
          <div className='info'>
            <h3>
              Ratings
            </h3>
              {movieDetail.Ratings 
                ? movieDetail.Ratings.map((rating) => (
                  <div>
                    <h3>
                      {rating.Source}
                    </h3>
                    <p>
                      {rating.Value}
                    </p>
                  </div>
                )) 
                : console.log("have not been fetched")
               }
            <h3>
              Cast
            </h3>
              <p>{movieDetail.Actors}</p>
            <h3>
              Genre
            </h3>
              <p>{movieDetail.Genre}</p>
            <h3>
              Plot
            </h3>
              <p>{movieDetail.Plot}</p> 
          </div>
        </div>
      </div>
    </MovieDetailCard>
    </div>
  );
}

export default MovieDetails