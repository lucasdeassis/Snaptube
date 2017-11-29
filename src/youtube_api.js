import YTSearch from 'youtube-api-search';
let googleAuth = {};

/**
 * remove from object the params that came empty
 * @param {*} params
 */
const removeEmptyParams = (params) => {
  for (var p in params) {
    if (!params[p] || params[p] === 'undefined') {
      delete params[p];
    }
  }
  return params;
}

/**
 *
 * @param {*} requestMethod  GET, POST, PUT
 * @param {*} path url to call
 * @param {*} params varies accordingly to https://developers.google.com/youtube/v3/docs/captions or videos
 * @param {*} properties additional properties
 */
const apiRequest = (requestMethod, path, params, properties) => {
  params = removeEmptyParams(params);
  var request;
  if (properties) {
    var resource = oauth2.createResource(properties);
    request = window.gapi.client.request({
      'body': resource,
      'method': requestMethod,
      'path': path,
      'params': params
    });
  } else {
    request = window.gapi.client.request({
      'method': requestMethod,
      'path': path,
      'params': params
    });
  }
  return executeRequest(request);
};
//six-month-old Nina learn how to walk on a leash without pulling

const executeRequest = (request) => {
  return request.execute();
};

const oauth2 = {
  start: () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client.init({
      'apiKey': 'AIzaSyBsSxXHTV-VudZeNMaAFgSy6kZCH8r4ppU',
      // clientId and scope are optional if auth is not required.
      'clientId': '475996322746-fd6flkrafpmf0bvlat4pua3s75phf2o4.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner',
    }).then(() => {
      googleAuth = window.gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      googleAuth.isSignedIn.listen(this.updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      this.setSigninStatus();
    });
  },
  updateSigninStatus: (isSignedIn) => {
    this.setSigninStatus();
  },
  setSigninStatus: () => {
    const user = googleAuth.currentUser.get();
    youtubeApi.isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
    // enable button based on current auth status.
    if (!youtubeApi.isAuthorized) {
      googleAuth.signIn();
    }
  }
}


/**
 * https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.captions.list or .download
 * to see responses format
 */
const youtubeApi = {
  isAuthorized: false,

  load: () => {
    window.gapi.load('client', oauth2.start);
  },

  searchVideo: (term, callback) => {
    YTSearch({ key: 'AIzaSyBsSxXHTV-VudZeNMaAFgSy6kZCH8r4ppU', term: term }, callback);
  },

  searchVideoCaptions: (videoId) => {
    return apiRequest('GET',
      '/youtube/v3/captions',
      {
        'part': 'snippet',
        'videoId': videoId,
        'onBehalfOfContentOwner': ''
      }).map(response => response.body.items.filter(caption => caption.snippet.language === 'en'));
  },

  getCaption: (captionsId) => {
    // 3. Initialize and make the API request.
    return apiRequest('GET',
      'https://www.googleapis.com/youtube/v3/captions/' + captionsId,
      { 'tfmt': 'sbv' });
    // window.gapi.client.request({
    //   'method': 'GET',
    //   'path': 'https://www.googleapis.com/youtube/v3/captions/' + captionsId,
    //   'params': {
    //     'tfmt': 'sbv'
    //   }
    // }).then((response) => {
    //   console.log(response.body);
    // }, (reason) => {
    //   console.log('Error: ' + reason.result.error.message);
    // });
  }
};

export default youtubeApi;
