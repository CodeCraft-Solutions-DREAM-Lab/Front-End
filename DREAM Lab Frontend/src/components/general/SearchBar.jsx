import React from 'react';
import "../../App.css";

const SearchBar = () => {
    return (
        <div className="searchContainer">
            <input
                type="text"
                className="searchBar"
                placeholder=""
            />
        </div>
    );
};

export default SearchBar;
