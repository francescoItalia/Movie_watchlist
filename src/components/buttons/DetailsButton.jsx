import React, { Component } from 'react';
import styles from './DetailsButton.module.css';

class Button extends Component {
    render() {
        return (
            <button className={styles.button} type="button" onClick={this.props.toggleDetails}>
                {this.props.detailsShown ? "Hide" : "Show"}
            </button>
        );
    }
}

export default Button;