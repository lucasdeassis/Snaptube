import youtubeApi from './youtube_api'

const oauth2 = {
  googleAuth: {},

  setSigninStatus () {
    const user = this.googleAuth.currentUser.get()
    youtubeApi.isAuthorized = this.userHasGrantedScopes(user)
    if (!youtubeApi.isAuthorized) {
      this.googleAuth.signIn()
    }
  },
  updateSigninStatus (signedIn) {
    if (!signedIn) {

    }
  },
  start (currentUserListener) {
    // 2. Initialize the JavaScript client library.
    window.gapi.client.init({
      'apiKey': 'AIzaSyBsSxXHTV-VudZeNMaAFgSy6kZCH8r4ppU',
      // clientId and scope are optional if auth is not required.
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      'clientId': '475996322746-fd6flkrafpmf0bvlat4pua3s75phf2o4.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/userinfo.profile'
    }).then(this.onAuthInit.bind(this, currentUserListener))
  },
  onAuthInit (currentUserListener) {
    this.googleAuth = window.gapi.auth2.getAuthInstance()

    // https://developers.google.com/identity/sign-in/web/reference
    this.googleAuth.currentUser.listen(
      this.updateUser.bind(this, this.googleAuth.currentUser.get(), currentUserListener))

    // Listen for sign-in state changes.
    this.googleAuth.isSignedIn.listen(this.updateSigninStatus)

    // Handle initial sign-in state. (Determine if user is already signed in.)
    this.setSigninStatus()
  },
  updateUser (user, currentUserListener) {
    if (this.userHasGrantedScopes(user)) {
      const profile = user.getBasicProfile()

      currentUserListener({
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl()
      })
    } else {
      currentUserListener({})
    }
  },
  userHasGrantedScopes (user) {
    return user.hasGrantedScopes(
    'https://www.googleapis.com/auth/youtube.force-ssl ' +
    'https://www.googleapis.com/auth/userinfo.profile')
  }
}

export default oauth2
