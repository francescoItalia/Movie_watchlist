import React, { Component } from 'react';
import styles from './LikeButton.module.css';

class LikeButton extends Component {
    render() {
        return (
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    this.props.toggleFavourites(this.props.id)
                }}
                className={this.props.isFavourite
                    ? `${styles.svg_container} ${styles.favourite}`
                    : styles.svg_container}
            >
                <div>
                    <svg>
                        <path d="m17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8-1.6-1.6-3.8-3.2-6.2-2.7-1.5.2-2.9 1.2-3.6 2.6-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6" stroke-linejoin="round">
                        </path>
                    </svg>
                </div>
            </div>
        );
    }
}


export default LikeButton;