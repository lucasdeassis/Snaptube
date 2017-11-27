import React from 'react';
import './Search.css';

const Search = () => {
    return (
        <div className="col-lg-6 offset-lg-3">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="people from phoenix are phoenicians" aria-label="Search for..." />
                <span className="input-group-btn">
                    <button className="btn btn-secondary" type="button">Search!</button>
                </span>
            </div>
        </div>
    );
};

export default Search;