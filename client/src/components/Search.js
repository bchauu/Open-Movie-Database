import React, { useState } from "react";
import './Search.css';


function Search(props) {

  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredYear: ''
  });

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
      .then((data) => props.onAddMovie(data))
      .catch(error => {
        throw(error);
    })
    } else {
    fetch(`http://www.omdbapi.com/?t=${title}&y=${year}&apikey=917b056f`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    })
    .then((data) => props.onAddMovie(data))
    .catch(error => {
      console.log(error);
  })
    }
  }

  // fetch(url).then((response) => {
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   throw new Error('Something went wrong');
  // })
  // .then((responseJson) => {
  //   // Do something with the response
  // })
  // .catch((error) => {
  //   console.log(error)
  // });

  const yearChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target)

    setUserInput((prevState) => {
      return {...prevState, enteredYear: e.target.value };
    });

  }

  return (
      <form value="enter here" className='form' onSubmit={submitHandler}>
          <div>
            <label>Title </label>
            <input type='text' placeholder='Guardian' onChange={titleChangeHandler}/>
          </div>
          <div>
            <label>Year </label>
            <input type='text' placeholder='2018' onChange={yearChangeHandler}/>
          </div>
          <div>
            <button type='submit'> Search </button>
          </div>
      </form>
  );
}

export default Search