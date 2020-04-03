import React, { Component } from 'react';
import Movie from './Movie';
import FilterSelect from './FilterSelect';

class MovieList extends Component {
    render() {
        return (
            <section>
                <h2>{this.props.listType === 'All' ? 'All Movies' : 'Favourite Movies'}</h2>
                {/* If listType is All Movies, then show a filtering select */}
                {this.props.listType === 'All' &&
                    <FilterSelect
                        genres={this.props.genres}
                        filterMovies={this.props.filterMovies}
                    />
                }
                <div className='movies_container'>
                    {this.props.movies.map((el, i) => {
                        return (
                            <Movie
                                key={i}
                                movie={el}
                                listType={this.props.listType}
                                toggleMovie={this.props.toggleMovie}
                            />
                        )
                    })}
                </div>
            </section>
        );
    }
}

export default MovieList;