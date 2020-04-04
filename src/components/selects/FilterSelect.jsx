import React from 'react';
import styles from './Select.module.css';

const FilterSelect = (props) => {
    return (
        <div className="filter_genres">
            <select className={styles.select}

                onChange={(e) => {
                    const target = e.target;
                    const value = target.value;
                    props.filterMovies(value)
                }}
            >
                <option defaultValue value="">{props.filterBy ? props.filterBy : 'All Genres'}</option>
                {props.genres.map((el, i) => {
                    return <option key={i} value={el}>{el}</option>
                })}
            </select>
        </div>
    );


}

export default FilterSelect;