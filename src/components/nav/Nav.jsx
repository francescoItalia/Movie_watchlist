import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from './Nav.module.css';

class Nav extends Component {
    state = {}
    render() {
        return (
            <nav className={`${styles.nav} ${this.props.showNav ? styles.show : styles.hide}`}>
                {this.props.routes.map((route, i) => {
                    const [routeData] = Object.entries(route); // Object.entries return an array of arrays
                    return (
                        <Link
                            key={i}
                            to={routeData[0]}
                            onClick={this.props.toggleMobileNav}
                            data-added=
                            {routeData[0] === '/watchlist' && this.props.addedToWatchlist > 0
                                ? this.props.addedToWatchlist
                                : routeData[0] === '/favourites' && this.props.addedToFavourites > 0
                                    ? this.props.addedToFavourites
                                    : undefined}
                        >
                            {routeData[1]}
                        </Link>
                    )

                })}
            </nav>
        );
    }
}

export default Nav;