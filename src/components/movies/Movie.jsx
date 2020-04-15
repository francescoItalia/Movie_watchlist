import React, { Component } from 'react';
import ToggleButton from '../buttons/ToggleButton';
import LikeButton from '../buttons/LikeButton';
import styles from './Movie.module.css';
import defaultImg from '../../static/404-error-for-img.gif';

class Movie extends Component {
    state = {
        detailsShown: false
    };
    render() {
        return (
            <div className={styles.movie} onClick={() => this.props.showExpandedMovie(this.props.movie)}>
                <LikeButton
                    toggleFavourites={this.props.toggleFavourites}
                    id={this.props.movie.id}
                    isFavourite={this.props.movie.isFavourite}
                />
                <figure className={styles.figure}>
                    <div className={styles.img_button_container}>
                        <img className={styles.img} onError={this.addDefaultSrc}
                            src={this.props.movie.posterUrl}
                            alt={`${this.props.movie.title}`}
                        />
                        {/* This button controls the toggling of each movie's details dropdown 
                            Only load the button on All Movies and Whatchlist Pages
                        */}
                        {this.props.listType === 'watchlist' || this.props.listType === 'all movies'
                            ? <ToggleButton
                                toggleMovie={this.props.toggleMovie}
                                movie={this.props.movie}
                                isAdded={this.props.listType === 'watchlist' && true}
                            /> : null
                        }
                    </div>
                    <figcaption className={`${styles.figcaption} ${this.state.detailsShown ? styles.show : styles.hide}`}>
                        <ul>
                            <li>
                                <span>Title: </span>
                                {this.props.movie.title}
                            </li>
                            <li>
                                <span>Genres: </span>
                                {this.props.movie.genres.toString().replace(/,/g, ", ")}
                            </li>
                            <li>
                                <span>Plot: </span>
                                {this.props.movie.plot.substr(0, 65)}
                                ...
                            </li>
                        </ul>
                    </figcaption>
                </figure>
            </div>
        );
    }

    addDefaultSrc(ev) {
        ev.target.src = defaultImg;
    }

    toggleDetails = () => {
        this.setState({ detailsShown: !this.state.detailsShown });
    };
}

export default Movie;