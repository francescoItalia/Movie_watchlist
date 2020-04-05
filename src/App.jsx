import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import AllMovies from './components/routes/AllMovies';
import RandomMoviePicker from './components/routes/RandomMoviePicker';
import FavouriteMovies from './components/routes/FavouriteMovies';
import ResponsiveNav from './components/nav/ResponsiveNav';
import routes from './data/navItems.json'


class App extends Component {
  state = {
    isFetching: true,
    allMovies: [],
    genres: [],
    favouriteMovies: [],
    genreFilter: '',
    anyFieldFilter: '',
    randomMovie: {},
    showNav: false
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
            <ResponsiveNav
              routes={routes}
              toggleMobileNav={this.toggleMobileNav}
              showNav={this.state.showNav}
              filterMovies={this.setFilterValue}
              moviesAdded={this.state.favouriteMovies.length ? this.state.favouriteMovies.length : undefined}
            />
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
              <Route path="/favourites">
                <FavouriteMovies
                  toggleMovie={this.toggleMovie} // ln: 108
                  genres={this.state.genres}
                  favouriteMovies={this.state.favouriteMovies}
                />
              </Route>
              <Route path="/">
                <AllMovies
                  toggleMovie={this.toggleMovie} // ln: 108
                  filterMovies={this.setFilterValue} // ln: 145
                  genreFilter={this.state.genreFilter}
                  genres={this.state.genres}
                  allMovies={
                    this.state.genreFilter || this.state.anyFieldFilter ?
                      this.filterMovies() : // ln: 152
                      this.state.allMovies
                  }
                  toggleMobileNav={this.toggleMobileNav} // ln: 191
                />
              </Route>
            </Switch>
          </div>
        </Router>
      ));
  }
  // Toggle a movie in or out Favourites.
  // It takes a boolean indicating if the move is already added as favourite and the movie id.
  // Sent down to both RandomMoviePicker.jsx and AllMovies.
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

  // Updates the filter properties in state.
  // Called when filtering through FilterSelect.jsx or SearchBar.jsx. 
  // Arguments: type of filtering and the string resulting from selection or typing.
  // Passed down through AllMovies.jsx and ResponsiveNav.jsx
  /* When filterValue exists, it is used by filterMovies method (ln: 151) 
     to filter allMovies array before passing it down to components */
  setFilterValue = (filterType, filterValue) => {
    if (filterType === 'genre')
      this.setState({ genreFilter: filterValue });
    if (filterType === 'search')
      this.setState({ anyFieldFilter: filterValue });
  }

  filterMovies = () => {
    // Filter the All Movies array if th genere select was used
    let filteredMovies = [...this.state.allMovies];
    if (this.state.genreFilter) {
      filteredMovies = filteredMovies.filter(movie => {
        return movie.genres.indexOf(this.state.genreFilter) > -1;
      });
    }

    // Filter the All Movies or the array filtered by genre if the Search Bar was used
    if (this.state.anyFieldFilter) {
      filteredMovies = filteredMovies.filter(movie => {
        // Object.values return the movie object keys' values in an array
        return Object.values(movie).some(movieData => {
          // Match each movie info against the inputted text
          const match = new RegExp(this.state.anyFieldFilter, 'gi');
          return match.test(movieData);
        });
      })
    }

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

  toggleMobileNav = () => {
    this.setState({ showNav: !this.state.showNav })
  }
}

export default App;
