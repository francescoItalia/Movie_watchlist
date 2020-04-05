import React, { Component } from 'react';
import DetailsButton from '../buttons/DetailsButton';
import ToggleButton from '../buttons/ToggleButton';
import styles from './Movie.module.css';
import defaultImg from '../../static/404-error-for-img.gif'

class Movie extends Component {
    state = {
        detailsShown: false
    };
    render() {
        return (
            <div className={styles.movie}>
                <figure className={styles.figure}>
                    <div className={styles.img_button_container}>
                        <img className={styles.img} onError={this.addDefaultSrc}
                            src={this.props.movie.posterUrl}
                            alt={`${this.props.movie.title}`}
                        />
                        {/* This button controls the toggling of each movie's details dropdown */}
                        <DetailsButton
                            detailsShown={this.state.detailsShown}
                            toggleDetails={this.toggleDetails} // ln:59
                        />
                        <ToggleButton
                            toggleMovie={this.props.toggleMovie}
                            movie={this.props.movie}
                            isAdded={this.props.listType === 'Favourite' && true}
                        />
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