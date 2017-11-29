import React from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { searchSnap } from '../actions/index';

const Search = (props) => {
  let input;

  return (
    <div className="col-lg-6 offset-lg-3">
      <div className="input-group">
        <input type="search"
          ref={node => { input = node }}
          className="form-control"
          placeholder="people from phoenix are phoenicians"
          aria-label="Search for..." />

        <span className="input-group-btn">
          <button disabled={props.disabled}
            onClick={() => props.onSearch(input.value)}
            className="btn btn-secondary"
            type="button">Search!</button>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);

  return {
    query: state.query,
    videos: state.videos
  };
}

export default connect(mapStateToProps, { searchSnap })(Search);
