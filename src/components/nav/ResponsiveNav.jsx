import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Logo from './Logo';
import SearchBar from './SearchBar';
import styles from './ResponsiveNav.module.css';


class ResponsiveNav extends Component {
    render() {
        return (
            <header className={styles.header}>
                <div className={styles.container}>
                    <Logo
                        toggleMobileNav={this.props.toggleMobileNav}
                        totalAdded={this.props.addedToWatchlist + this.props.addedToFavourites} />
                    <SearchBar filterMovies={this.props.filterMovies} />
                </div>
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
            </header>
        );
    }
}

export default ResponsiveNav;