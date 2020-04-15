import React, { Component } from 'react';
import Movie from './Movie';
import FilterSelect from '../selects/FilterSelect';
import styles from './MovieList.module.css'

class MovieList extends Component {
    render() {
        return (
            <section>
                <h2>{this.toTitleCase(this.props.listType)}</h2>
                {/* If listType is All Movies, then show a filtering select */}
                {this.props.listType === 'all movies' &&
                    <FilterSelect
                        genres={this.props.genres}
                        filterMovies={this.props.filterMovies}
                        genreFilter={this.props.genreFilter}
                    />
                }
                <div className={styles.movies_container}>
                    {this.props.movies.map((el, i) => {
                        return (
                            <Movie
                                key={i}
                                movie={el}
                                listType={this.props.listType}
                                toggleMovie={this.props.toggleMovie}
                                showExpandedMovie={this.props.showExpandedMovie}
                                toggleFavourites={this.props.toggleFavourites}
                            />
                        )
                    })}
                </div>
            </section>
        );
    }

    toTitleCase = (str) =>
        str.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
}

export default MovieList;