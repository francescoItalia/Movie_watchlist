import React, { Component } from 'react'
import styles from './Logo.module.css';
import logo from '../../static/logo.png';
import mobileLogo from '../../static/mobile_logo.png';

class Logo extends Component {
    state = {
        flipped: false
    }
    render() {
        return (
            <div className={styles.logo_container}>
                <img
                    src={logo}
                    alt="favourite movies logo"
                    className={styles.logo}
                />
                <div
                    className={styles.mobileLogo}
                    onClick={() => {
                        this.props.toggleMobileNav();
                        this.setState({ flipped: !this.state.flipped })
                    }}
                    data-added={this.props.totalAdded > 0 ? this.props.totalAdded : undefined}
                >
                    <img
                        src={mobileLogo}
                        alt="favourite movies logo"
                    />
                    <i className={this.state.flipped
                        ? `${styles.down} ${styles.flip}`
                        : styles.down
                    }></i>
                </div>
            </div>
        );
    }
}

export default Logo;