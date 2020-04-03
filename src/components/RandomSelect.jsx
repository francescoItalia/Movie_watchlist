import React from 'react';
import '../styles/Selects.css'

const RandomSelect = (props) => {
    return (
        <div>
            <select id="random_genres" onChange={(el) => { props.getRandomMovie(el.target.value) }}>
                <option defaultValue value="">All Genres</option>
                {props.genres.map((el, i) => {
                    return <option key={i} value={el}>{el}</option>
                })}
            </select>
        </div>);
}

export default RandomSelect;