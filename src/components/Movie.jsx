import React, { Component } from "react";
import DetailsButton from "./DetailsButton";
import ToggleButton from './ToggleButton';
import "../styles/Movie.css";
import defaultImg from '../404-error-for-img.gif'

class Movie extends Component {
    state = {
        detailsShown: false
    };
    render() {
        return (
            <div className="movie">
                <figure>
                    <div className="img_button_container">
                        <img onError={this.addDefaultSrc}
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
                    <figcaption className={this.state.detailsShown ? "show" : "hide"}>
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