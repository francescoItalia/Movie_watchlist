import React from 'react';
import styles from './Select.module.css';

const FilterSelect = (props) => {
    return (
        <div className={styles.filter_container}>
            <select className={styles.select}

                onChange={(e) => {
                    props.filterMovies('genre', e.target.value)
                }}
            >
                {/* If the filter was used, then give the last filtered value as first option */}
                {props.genreFilter ?
                    <>
                        <option value="">{props.genreFilter}</option>
                        <option value="">-- All Genres --</option>
                    </> :
                    <>
                        <option value="">-- All Genres --</option>
                    </>
                }

                {props.genres.map((el, i) => {
                    return <option key={i} value={el}>{el}</option>
                })}
            </select>
        </div>
    )
}

export default FilterSelect;