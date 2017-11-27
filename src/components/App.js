import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Search from './Search';
import youtubeOauth2 from '../youtube_oauth2';

class App extends Component {

  constructor(props) {
    super(props);

    // 1. Load the JavaScript YOUTUBE client library.
    youtubeOauth2.load(this.props.store);
  }

  render() {
    return (
      <div className="App">
        <Navbar />

        <p className="App-intro">
          Watch specific youtube video pieces.
          To find the video part you want, just type the matching audio track.
        </p>

        <Search />
      </div>
    );
  }
}

export default App;
