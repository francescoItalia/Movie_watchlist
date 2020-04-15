import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import AllMovies from './components/routes/AllMovies';
import RandomMoviePicker from './components/routes/RandomMoviePicker';
import FilteredMovies from './components/routes/FilteredMovies';
import ResponsiveNav from './components/nav/ResponsiveNav';
import routes from './data/navItems.json'


class App extends Component {
  state = {
    isFetching: true,
    allMovies: [],
    genres: [],
    preferences: {},
    genreFilter: '',
    anyFieldFilter: '',
    randomMovie: {},
    showNav: false
  }

  componentDidMount = async () => {
    // fetch movies
    const url = 'https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json';
    const fetchUrl = await fetch(url);
    const data = await fetchUrl.json();

    let allMovies = data.movies;
    const genres = data.genres;
    let favourites = [];
    let watchlist = [];
    // Get preferences from the local storage if previously added
    let preferences = JSON.parse(localStorage.getItem("preferences"));

    if (preferences !== null) {
      // if there are movies in watchlist remove from all movies
      if (preferences.watchlist.length) {
        watchlist = preferences.watchlist;
        allMovies = allMovies.filter((movieA) => {
          return !watchlist.find((movieB) => movieA.id === movieB.id)
        })
      }
      // if there are movies in favourites update all movies list
      if (preferences.favourites.length) {
        favourites = preferences.favourites;
        allMovies.forEach((movieA, i) => {
          const isFavourite = !!preferences.favourites.find((movieB) => movieA.id === movieB.id);
          if (isFavourite) {
            allMovies[i].isFavourite = true;
          } else {
            allMovies[i].isFavourite = false;
          }
        })
      }
    } else {
      preferences = {
        favourites,
        watchlist
      };
    }

    // use map() to perform a fetch and handle the response for each url
    Promise.all(allMovies.map(async (movie, i) => {
      try {
        await fetch(movie.posterUrl)
      } catch (e) {
        // If fatching image poster url fails, use iMDb API
        const baseiMDbAPIUrl = 'http://www.omdbapi.com/?apikey=218cd87&t=';
        const formattedMovieTitle = encodeURI(movie.title);
        const fetchNewImage = await fetch(baseiMDbAPIUrl + formattedMovieTitle);
        const movieData = await fetchNewImage.json();
        // Get the poster URL out of the movie object                 
        const url = movieData.Poster;
        allMovies[i].posterUrl = url;
        console.log();

        console.log(`new url: ${url}`)
      }
    }
    ))
      .then(data => {
        console.log('Set State');
        this.setState({ isFetching: false, allMovies, genres, preferences })
      })
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
              addedToWatchlist={this.state.preferences.watchlist.length}
              addedToFavourites={this.state.preferences.favourites.length}
            />
            <Switch>
              <Route path="/random-picker">
                <RandomMoviePicker
                  movies={this.state.allMovies}
                  genres={this.state.genres}
                  toggleMovie={this.toggleMovie}
                  getRandomMovie={this.getRandomMovie}
                  randomMovie={this.state.randomMovie}
                  toggleFavourites={this.toggleFavourites}
                />
              </Route>
              <Route path="/favourites">
                <FilteredMovies
                  toggleMovie={this.toggleMovie} // ln: 108
                  genres={this.state.genres}
                  movies={this.state.preferences.favourites}
                  listType="favourites"
                  toggleFavourites={this.toggleFavourites}
                />
              </Route>
              <Route path="/watchlist">
                <FilteredMovies
                  toggleMovie={this.toggleMovie} // ln: 108
                  genres={this.state.genres}
                  movies={this.state.preferences.watchlist}
                  listType="watchlist"
                  toggleFavourites={this.toggleFavourites}
                />
              </Route>
              <Route path="/">
                <AllMovies
                  toggleMovie={this.toggleMovie} // ln: 108
                  filterMovies={this.setFilterValue} // ln: 145
                  genreFilter={this.state.genreFilter}
                  genres={this.state.genres}
                  movies={
                    this.state.genreFilter || this.state.anyFieldFilter ?
                      this.filterMovies() : // ln: 152
                      this.state.allMovies
                  }
                  toggleMobileNav={this.toggleMobileNav} // ln: 191
                  listType="all movies"
                  toggleFavourites={this.toggleFavourites}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      ));
  }
  // Toggle a movie in or out watchlist.
  // It takes a boolean indicating if the movie is already added as favourite and the movie id.
  // Sent down to both RandomMoviePicker.jsx and AllMovies.
  // Called by ToggleButton.jsx, rendered by Movie.jsx
  // Called when clicking on ToggleButton.jsx ('Add', or 'Remove')
  toggleMovie = (movieIsAdded, movieId) => {
    // Get the Favourite Movies and the All Movies arrays
    let preferences = this.state.preferences;
    const watchlist = [...preferences.watchlist]
    const allMovies = [...this.state.allMovies];

    if (movieIsAdded) {
      // Find the index of movie to remove
      const index = watchlist.findIndex(el => el.id === movieId);
      // Add back to all movies and sort them back as original sort by id
      allMovies.push(watchlist[index])
      allMovies.sort((a, b) => a.id - b.id);
      // Remove from favourite Array
      watchlist.splice(index, 1);

    } else {
      // Find the index of movie to add
      const index = allMovies.findIndex(el => el.id === movieId);
      // Add it to the favourite Movies and sort them back as original sort by id
      watchlist.push(allMovies[index])
      watchlist.sort((a, b) => a.id - b.id);
      // Remove from all movies Array
      allMovies.splice(index, 1);
    }

    // Save preference to local storage with updated watchlist
    preferences = {
      watchlist,
      favourites: preferences.favourites
    }

    localStorage.setItem("preferences", JSON.stringify(preferences));

    // Update the state with preferences
    this.setState({ allMovies, preferences, randomMovie: {} })
  }

  toggleFavourites = (id) => {
    let preferences = this.state.preferences;
    const favourites = this.state.preferences.favourites;
    const allMovies = this.state.allMovies;

    // Get the index of the movie from all movies
    const allMoviesIndex = allMovies.findIndex(movie => movie.id === id);
    const favouriteIndex = favourites.findIndex(movie => movie.id === id);

    if (allMovies[allMoviesIndex].isFavourite) {
      allMovies[allMoviesIndex].isFavourite = false;
      favourites.splice(favouriteIndex, 1)
    } else {
      allMovies[allMoviesIndex].isFavourite = true;
      favourites.push(allMovies[allMoviesIndex])
    }

    // Save preference to local storage with updated watchlist
    preferences = {
      watchlist: preferences.watchlist,
      favourites
    }

    localStorage.setItem("preferences", JSON.stringify(preferences));

    this.setState({ allMovies, preferences })
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

    // If no films are filtered they are all added in watchlist
    // set  randomMovie to an empty object
    const randomMovie =
      filteredMovies.length ?
        filteredMovies[Math.floor(Math.random() * filteredMovies.length)] :
        {};

    // Set the state
    this.setState({ randomMovie })
  }

  toggleMobileNav = () => {
    this.setState({ showNav: !this.state.showNav })
  }
}

export default App;
