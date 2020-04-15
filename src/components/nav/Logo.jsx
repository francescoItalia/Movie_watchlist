import React from 'react';
import styles from './Logo.module.css';
import logo from '../../static/logo.png';
import mobileLogo from '../../static/mobile_logo.png';

const Logo = (props) => {
    return (
        <div className={styles.logo_container}>
            <img
                src={logo}
                alt="favourite movies logo"
                className={styles.logo}
            />
            <div
                className={styles.mobileLogo}
                onClick={props.toggleMobileNav}
                data-added={props.totalAdded > 0 ? props.totalAdded : undefined}
            >
                <img
                    src={mobileLogo}
                    alt="favourite movies logo"
                />
                <i className={styles.down}></i>
            </div>
        </div>
    );
}

export default Logo;