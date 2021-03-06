import React, { Component } from 'react';
import MovieList from '../movies/MovieList';
import MovieExpanded from '../movies/MovieExpanded';
import styles from './Movies.module.css';

class FavouriteMovies extends Component {
    state = {
        movieExpanded: {}
    }
    render() {
        return (
            <div className={styles.lists_container}>
                {this.state.movieExpanded.title && <MovieExpanded movie={this.state.movieExpanded} closeExpandedMovie={this.closeExpandedMovie} />}
                <MovieList
                    listType={this.props.listType}
                    movies={this.props.movies}
                    genres={this.props.genres}
                    toggleMovie={this.props.toggleMovie}
                    filterMovies={this.props.filterMovies}
                    genreFilter={this.props.genreFilter}
                    showExpandedMovie={this.showExpandedMovie}
                    toggleFavourites={this.props.toggleFavourites}
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