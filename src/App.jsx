import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import ManualMoviePicker from './components/ManualMoviePicker';
import RandomMoviePicker from './components/RandomMoviePicker';


class App extends Component {
  state = {
    isFetching: true,
    allMovies: [],
    genres: [],
    favouriteMovies: [],
    filterBy: '',
    randomMovie: {}
  }

  componentDidMount = () => {
    // fetch movies
    const url = 'https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json';
    fetch(url)
      .then(res => res.json()).then(data => {
        let allMovies = data.movies;
        const genres = data.genres;

        // Get favourites from the local storage if previously added
        const favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));

        if (favouriteMovies !== null) {
          // Remove favourite movies from all movies
          allMovies = allMovies.filter(function (objFromA) {
            return !favouriteMovies.find(function (objFromB) {
              return objFromA.id === objFromB.id
            })
          })
          this.setState({ isFetching: false, allMovies, genres, favouriteMovies })
        }
        this.setState({ isFetching: false, allMovies, genres })
      })
      .catch(err => console.error(err));
  }

  render() {

    return (
      this.state.isFetching ? 'Fetching Data' : (
        <Router>
          <div>
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/random-picker">Random Picker</Link>
                  </li>
                </ul>
              </nav>
            </header>
            <Switch>
              <Route path="/random-picker">
                <RandomMoviePicker
                  movies={this.state.allMovies}
                  genres={this.state.genres}
                  toggleMovie={this.toggleMovie}
                  getRandomMovie={this.getRandomMovie}
                  randomMovie={this.state.randomMovie}
                />
              </Route>
              <Route path="/">
                <ManualMoviePicker
                  toggleMovie={this.toggleMovie} // ln: 78
                  filterMovies={this.setFilterValue} // ln: 119
                  genres={this.state.genres}
                  favouriteMovies={this.state.favouriteMovies}
                  allMovies={
                    this.state.filterBy ?
                      this.filterMovies(this.state.filterBy) : // ln: 119
                      this.state.allMovies
                  }
                />
              </Route>
            </Switch>
          </div>
        </Router>
      ));
  }
  // Toggle a movie in or out Favourites.
  // It takes a boolean indicating if the move is already added as favourite and the movie id.
  // Sent down to both RandomMoviePicker.jsx and ManualMoviePicker.
  // Called by ToggleButton.jsx, rendered by Movie.jsx
  // Called when clicking on ToggleButton.jsx ('Add', or 'Remove')
  toggleMovie = (movieIsAdded, movieId) => {
    // Get the Favourite Movies and the All Movies arrays
    const favouriteMovies = [...this.state.favouriteMovies];
    const allMovies = [...this.state.allMovies];

    if (movieIsAdded) {
      // Find the index of movie to remove
      const index = favouriteMovies.findIndex(el => el.id === movieId);
      // Add back to all movies and sort them back as original sort by id
      allMovies.push(favouriteMovies[index])
      allMovies.sort((a, b) => a.id - b.id);
      // Remove from favourite Array
      favouriteMovies.splice(index, 1);

    } else {
      // Find the index of movie to add
      const index = allMovies.findIndex(el => el.id === movieId);
      // Add it to the favourite Movies and sort them back as original sort by id
      favouriteMovies.push(allMovies[index])
      favouriteMovies.sort((a, b) => a.id - b.id);
      // Remove from all movies Array
      allMovies.splice(index, 1);
    }

    // Save Favourites to local storage
    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));

    // Update the state with Favourites
    this.setState({ allMovies, favouriteMovies, randomMovie: {} })
  }

  // Updates the filterBy property in state.
  // Called when filtering through FilterSelect.jsx. It takes the string resulting from selection as argument.
  // Passed down through manualFilmPicker.js and MovieList.jsx
  /* When filterValue exists, it is used by filterMovies method (ln: 127) 
     to filter allMovies array before passing it down to manual and random movie picker components */
  setFilterValue = (filterValue) => {
    // Update the state with Favourites
    this.setState({ filterBy: filterValue });
  }

  filterMovies = (filterValue) => {
    // Filter the Favourite Movies Array and the all Movies array
    const filteredMovies = this.state.allMovies.filter(movie => {
      return movie.genres.indexOf(filterValue) > -1;
    });
    return filteredMovies;
  }

  // Randomly pick a movie based on a gender argument passed
  // Updates the state with a the randomly picked movie which is passed down to randomMoviePicker.jsx
  getRandomMovie = (genre) => {
    // Filter the movies array by selected value
    // // If genre selected is not in genres array, return allMovies array 
    const filteredMovies =
      this.state.genres.indexOf(genre) > -1 ?
        this.state.allMovies.filter(movie => movie.genres.indexOf(genre) > -1) :
        this.state.allMovies;

    // If no films are filtered they are all added in favourites
    // set  randomMovie to an empty object
    const randomMovie =
      filteredMovies.length ?
        filteredMovies[Math.floor(Math.random() * filteredMovies.length)] :
        {};

    // Set the stat
    this.setState({ randomMovie })
  }
}

export default App;
