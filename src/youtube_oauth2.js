import YTSearch from 'youtube-api-search';
let googleAuth = {};
let callback;

const youtubeOauth2 = {
  load: () => {
    window.gapi.load('client', start);
  },
  searchVideo: (term, callback) => {
    YTSearch({ key: 'AIzaSyBsSxXHTV-VudZeNMaAFgSy6kZCH8r4ppU', term: term }, callback);
  },
  searchCaption: (captionsId) => {
    // 3. Initialize and make the API request.
    window.gapi.client.request({
      'method': 'GET',
      'path': 'https://www.googleapis.com/youtube/v3/captions/' + captionsId,
      'params': {
        'tfmt': 'sbv'
      }
    }).then((response) => {
      console.log(response.body);
      callback(response.body);
    }, (reason) => {
      console.log('Error: ' + reason.result.error.message);
      callback('');
    });
  },
  isAuthorized: false,
}

const start = () => {
  // 2. Initialize the JavaScript client library.
  window.gapi.client.init({
    'apiKey': 'AIzaSyBsSxXHTV-VudZeNMaAFgSy6kZCH8r4ppU',
    // clientId and scope are optional if auth is not required.
    'clientId': '475996322746-fd6flkrafpmf0bvlat4pua3s75phf2o4.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner',
  }).then(() => {

    googleAuth = window.gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    googleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state. (Determine if user is already signed in.)
    setSigninStatus();
  });
};

const updateSigninStatus = (isSignedIn) => {
  setSigninStatus();
};

const setSigninStatus = () => {
  const user = googleAuth.currentUser.get();
  youtubeOauth2.isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
  // Toggle button text and displayed statement based on current auth status.
  if (!youtubeOauth2.isAuthorized) {
    // defineRequest();
    // } else {
    googleAuth.signIn();
  }
};

export default youtubeOauth2;
