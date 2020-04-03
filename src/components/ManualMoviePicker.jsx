import React, { Component } from 'react';
import MovieList from './MovieList';

class FavouriteMovies extends Component {
    render() {

        return (
            <div className="lists_container">
                <MovieList
                    listType='Favourite'
                    movies={this.props.favouriteMovies}
                    toggleMovie={this.props.toggleMovie}
                />

                <MovieList
                    listType='All'
                    movies={this.props.allMovies}
                    genres={this.props.genres}
                    toggleMovie={this.props.toggleMovie}
                    filterMovies={this.props.filterMovies}
                />
            </div>
        );
    }

}

export default FavouriteMovies;