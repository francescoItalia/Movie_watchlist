import React, { Component } from 'react';
import MovieList from '../movies/MovieList';
import styles from './Movies.module.css';

class FavouriteMovies extends Component {
    render() {

        return (
            <div className={styles.lists_container}>
                <MovieList
                    listType='All'
                    movies={this.props.allMovies}
                    genres={this.props.genres}
                    toggleMovie={this.props.toggleMovie}
                    filterMovies={this.props.filterMovies}
                    genreFilter={this.props.genreFilter}
                />
            </div>
        );
    }

}

export default FavouriteMovies;