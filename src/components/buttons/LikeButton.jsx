import React, { Component } from 'react';
import styles from './LikeButton.module.css';

class LikeButton extends Component {
    render() {
        return (
            <div className={this.props.isFavourite
                ? `${styles.svg_container} ${styles.favourite}`
                : styles.svg_container}
                onClick={(e) => {
                    e.stopPropagation();
                    this.props.toggleFavourites(this.props.id)
                }}>
                <svg className={styles.svg} viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                    <g className={styles.Group} fill-rule="evenodd" transform="translate(467 392)">
                        <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" className={styles.heart} fill="#AAB8C2" />
                        <circle className={styles.main_circ} fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5" />
                    </g>
                </svg>
            </div>
        );
    }
}


export default LikeButton;