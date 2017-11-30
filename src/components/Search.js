import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { searchSnap } from '../actions/index';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    }

  }
  handleChange = (e) => {
    this.setState({
      input : e.target.value
    });
  }

  render() {

    return (
      <div className="col-lg-6 offset-lg-3">
        <div className="input-group">
          <input type="search"
            value={this.state.input}
            onChange={this.handleChange}
            className="form-control"
            placeholder="people from phoenix are phoenicians"
            aria-label="Search for..." />

          <span className="input-group-btn">
            <button disabled={this.props.disabled || !this.state.input}
              onClick={() => this.props.onSearch(this.state.input)}
              className="btn btn-secondary"
              type="button">Search!</button>
          </span>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  // console.log(state);

  return {
    query: state.query,
    videos: state.videos
  };
}

export default connect(mapStateToProps, { searchSnap })(Search);
