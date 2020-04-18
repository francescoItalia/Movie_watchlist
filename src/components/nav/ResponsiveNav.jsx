import React, { Component } from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Nav from './Nav';
import NavEntrance from '../animations/NavEntrance';
import styles from './ResponsiveNav.module.css';


class ResponsiveNav extends Component {
    render() {
        return (
            <>
                <header className={styles.header}>
                    <div className={styles.container}>
                        <Logo
                            toggleMobileNav={this.props.toggleMobileNav}
                            totalAdded={this.props.addedToWatchlist + this.props.addedToFavourites} />
                        <SearchBar filterMovies={this.props.filterMovies} />
                    </div>
                </header>
                <NavEntrance show={this.props.showNav}>
                    <Nav
                        routes={this.props.routes}
                        showNav={this.props.showNav}
                        toggleMobileNav={this.props.toggleMobileNav}
                        addedToWatchlist={this.props.addedToWatchlist}
                        addedToFavourites={this.props.addedToFavourites}
                    />
                </NavEntrance>
            </>
        );
    }
}

export default ResponsiveNav;