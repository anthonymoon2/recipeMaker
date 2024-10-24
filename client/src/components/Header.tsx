import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <h1>DishUp</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/search">Search</a></li>
                    <li><a href="/favorites">Favorites</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;