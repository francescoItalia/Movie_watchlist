import React, { Component } from 'react';
import MovieList from '../movies/MovieList';
import styles from './Movies.module.css';
import MovieExpanded from '../movies/MovieExpanded';

class FavouriteMovies extends Component {
    state = {
        movieExpanded: {}
    }
    render() {
        return (
            <div className={styles.lists_container}>
                {this.state.movieExpanded.title && <MovieExpanded movie={this.state.movieExpanded} closeExpandedMovie={this.closeExpandedMovie} />}
                <MovieList
                    listType='Favourite'
                    movies={this.props.favouriteMovies}
                    toggleMovie={this.props.toggleMovie}
                />
            </div>
        );
    }


    showExpandedMovie = (movie) => {
        this.setState({ movieExpanded: movie })
    }

    closeExpandedMovie = () => {
        this.setState({ movieExpanded: {} })
    }

}

export default FavouriteMovies;