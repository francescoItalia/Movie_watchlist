import React from 'react';
import styles from './ToggleButton.module.css';

const ToggleMovieButton = (props) => {
    // console.log(props);

    return (
        <button className={props.isAdded ? `${styles.button} ${styles.remove}` : `${styles.button} ${styles.add}`}
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                props.toggleMovie(props.isAdded, props.movie.id)
            }}
        >
            {props.isAdded ? "Remove" : "Add"}
        </button>
    );
}

export default ToggleMovieButton;