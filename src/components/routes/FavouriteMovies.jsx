import React, { Component } from 'react';
import MovieList from '../movies/MovieList';
import styles from './Movies.module.css';

class FavouriteMovies extends Component {
    render() {

        return (
            <div className={styles.lists_container}>
                <MovieList
                    listType='Favourite'
                    movies={this.props.favouriteMovies}
                    toggleMovie={this.props.toggleMovie}
                />
            </div>
        );
    }

}

export default FavouriteMovies;