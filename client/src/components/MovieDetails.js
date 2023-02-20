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
  // const params = useParams();

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?t=${movie.Title}&y=${movie.Year}&plot=full&apikey=917b056f`)
    .then((res) => res.json())
    .then((data) => setMovieDetail(data));
  }, [])

  console.log(movieDetail);



  return (
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
              {movieDetail.Ratings 
                ? movieDetail.Ratings.map((rating) => (
                  <p>
                    {rating.Source}
                    {rating.Value}
                  </p>
                )) 
                : console.log("have not been fetched")
               }
            </h3>
            <h3>
              Cast
              <p>{movieDetail.Actors}</p>
            </h3>
            <h3>
              Genre
              <p>{movieDetail.Genre}</p>
            </h3>
            <h3>
              Plot
              <p>{movieDetail.Plot}</p> 
            </h3>
          </div>
        </div>
      </div>
    </MovieDetailCard>
  );
}
// params to filter out json object

export default MovieDetails