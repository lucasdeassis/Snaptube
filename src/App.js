import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      googleAuth: {},
      captions: ''
    };
    // 1. Load the JavaScript client library.
    window.gapi.load('client', this.start);
  }

  start = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client.init({
      'apiKey': '<YOUTUBE-API-KEY>',
      // clientId and scope are optional if auth is not required.
      'clientId': '<SNAP-TUBE-ID>',
      'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner',
    }).then(() => {

      this.setState({
        googleAuth: window.gapi.auth2.getAuthInstance()
      });

      // Listen for sign-in state changes.
      this.state.googleAuth.isSignedIn.listen(this.updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      this.setSigninStatus();
    });
  }

  updateSigninStatus = (isSignedIn) => {
    this.setSigninStatus();
  }

  setSigninStatus = () => {
    const user = this.state.googleAuth.currentUser.get();
    const isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
    // Toggle button text and displayed statement based on current auth status.
    if (isAuthorized) {
      this.defineRequest();
    } else {
      this.state.googleAuth.signIn();      
    }
  }

  defineRequest = () => {
    // 3. Initialize and make the API request.
    window.gapi.client.request({
      'method': 'GET',
      'path': 'https://www.googleapis.com/youtube/v3/captions/e5z3-wRZ2304TUq1LfmmOoKFYH74JTAMVWL6PJKoPkc=',
      'params': {
        'tfmt': 'sbv'
      }
    }).then(function (response) {
      this.setState({
        captions: response.body
      });
    }, function (reason) {
      console.log('Error: ' + reason.result.error.message);
      this.setState({
        captions: ''
      });
    });
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
