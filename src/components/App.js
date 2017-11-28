import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Navbar from './Navbar';
import Search from './Search';
import youtubeOauth2 from '../youtube_oauth2';
import VideoList from './Video_list';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedVideo: {}
    }

    // 1. Load the JavaScript YOUTUBE client library.
    youtubeOauth2.load();
  }

  render() {
    const { query, videos } = this.props;

    return (
      <div className="App">
        <Navbar />

        <p className="App-intro">
          Watch specific youtube video pieces.
          To find the video part you want, just type the matching audio track.
        </p>

        <Search />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={videos}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    query: state.query,
    videos: state.videos
  };
}

export default connect(mapStateToProps, null)(App);
