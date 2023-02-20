import React, { useState } from "react";
import './Search.css';



function Search(props) {



  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredYear: ''
  });
  //save all movies that match into state
    //then map through state and return all in return statement
    //Collection of searched Movies viewable through cards

  const titleChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target)

    setUserInput((prevState) => {
      return {...prevState, enteredTitle: e.target.value };
    });

  }

  const submitHandler = (e) => {
    e.preventDefault();
    const title = userInput.enteredTitle;
    const year = userInput.enteredYear;

    if (year === '') {
      fetch(`http://www.omdbapi.com/?t=${title}&apikey=917b056f`)
      .then((res) => res.json())
      .then((data) => props.onAddMovie(data));
  } else {
    fetch(`http://www.omdbapi.com/?t=${title}&y=${year}&apikey=917b056f`)
    .then((res) => res.json())
    .then((data) => props.onAddMovie(data));
  }
  // props.onAddMovie(data)

  // if (movie.length > 1) {
  //   console.log(movie[0])
  // }
    }
  

  const yearChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target)

    setUserInput((prevState) => {
      return {...prevState, enteredYear: e.target.value };
    });

  }


  return (
    <div>
      <h1>Your Search Begins Here</h1>
      <form value="enter here" className='form' onSubmit={submitHandler}>
          <div>
            <div>
              <label>Title </label>
              <input type='text' placeholder='beach' onChange={titleChangeHandler}/>
            </div>
            <div>
              <label>Year </label>
              <input type='text' placeholder='1991' onChange={yearChangeHandler}/>
            </div>
            <div>
              <button type='submit'> Search </button>
            </div>
          </div>
        </form>
    </div>
  );
}

export default Search