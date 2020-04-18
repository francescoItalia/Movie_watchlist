import React, { Component } from 'react'
import styles from './Logo.module.css';
import logo from '../../static/logo.png';
import mobileLogo from '../../static/mobile_logo.png';

class Logo extends Component {
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
                    onClick={() => { this.props.toggleMobileNav() }}
                    data-added={this.props.totalAdded > 0 ? this.props.totalAdded : undefined}
                >
                    <img
                        src={mobileLogo}
                        alt="favourite movies logo"
                    />
                </div>
            </div>
        );
    }
}

export default Logo;