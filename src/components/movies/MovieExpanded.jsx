import React, { Component } from 'react';
import styles from './MovieExpanded.module.css';


class MovieExpanded extends Component {
    render() {
        return (
            <div className={styles.movieExpanded}>
                <figure className={styles.figure}>
                    <div>
                        <span className={styles.close} onClick={() => this.props.closeExpandedMovie()}></span>
                        <img
                            className={styles.img}
                            src={this.props.movie.posterUrl}
                            alt={`${this.props.movie.title}`}
                        />
                    </div>
                    <figcaption >
                        <ul>
                            <li className={styles.title}>
                                {this.props.movie.title}
                            </li>
                            <li className={styles.genres}>
                                {this.props.movie.genres.toString().replace(/,/g, " • ")}
                            </li>
                            <li className={styles.plot}>
                                {this.props.movie.plot}
                            </li>
                        </ul>
                    </figcaption>
                </figure>
            </div>
        );
    }
}

export default MovieExpanded;