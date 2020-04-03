import React from 'react';

const ToggleMovieButton = (props) => {
    // console.log(props);

    return (
        <button className={props.isAdded ? "remove toggle_button" : "add toggle_button"}
            type="button"
            onClick={() => { props.toggleMovie(props.isAdded, props.movie.id) }}
        >
            {props.isAdded ? "Remove" : "Add"}
        </button>
    );
}

export default ToggleMovieButton;