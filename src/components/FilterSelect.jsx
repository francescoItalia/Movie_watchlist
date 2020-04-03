import React from 'react';
import '../styles/Selects.css'

const FilterSelect = (props) => {
    return (
        <div className="filter_genres">
            <select

                onChange={(e) => {
                    const target = e.target;
                    const value = target.value;
                    props.filterMovies(value)
                }}
            >
                <option defaultValue value="">All Genres</option>
                {props.genres.map((el, i) => {
                    return <option key={i} value={el}>{el}</option>
                })}
            </select>
        </div>
    );


}

export default FilterSelect;