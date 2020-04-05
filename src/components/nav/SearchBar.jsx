import React from 'react';
import styles from './SearchBar.module.css'

const SearchBar = (props) => {
    return (
        <div
            className={styles.search}
            onChange={(e) => { props.filterMovies('search', e.target.value) }}>
            <input name="q" type="text" size="40" placeholder="Search..." />
        </div>
    );
}

export default SearchBar;