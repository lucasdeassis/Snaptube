import snapSearchAction from './actions/index';

const youtubeOauth2 = {
  googleAuth: {},
  load: (store) => {
    const start = () => {
      // 2. Initialize the JavaScript client library.
      window.gapi.client.init({
        'apiKey': '<YOUTUBE-API-KEY>',
        // clientId and scope are optional if auth is not required.
        'clientId': '<SNAP-TUBE-ID>',
        'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner',
      }).then(() => {

        this.googleAuth =  window.gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        this.googleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        setSigninStatus();
      });
    }

    const updateSigninStatus = (isSignedIn) => {
      setSigninStatus();
    }

    const setSigninStatus = () => {
      const user = this.googleAuth.currentUser.get();
      const isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
      // Toggle button text and displayed statement based on current auth status.
      if (isAuthorized) {
        defineRequest();
      } else {
        this.googleAuth.signIn();
      }
    }

    const defineRequest = () => {
      // 3. Initialize and make the API request.
      window.gapi.client.request({
        'method': 'GET',
        'path': 'https://www.googleapis.com/youtube/v3/captions/e5z3-wRZ2304TUq1LfmmOoKFYH74JTAMVWL6PJKoPkc=',
        'params': {
          'tfmt': 'sbv'
        }
      }).then((response) => {
        store.dispatch(new snapSearchAction('response.body'));
      }, (reason) => {
        console.log('Error: ' + reason.result.error.message);
        store.dispatch(new snapSearchAction('response.body'));

      });
    }

    window.gapi.load('client', start);

  }

}

export default youtubeOauth2;
