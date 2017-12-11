import youtubeApi from '../youtube_api'

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

export const loadUser = (currentUserListener) => {
  const request = new Promise((resolve, reject) => {
    // 1. Load the JavaScript YOUTUBE client library.
    youtubeApi.load((user) => {
      resolve(user)

      if(currentUserListener) {
        currentUserListener(user)
      }
    })
  })

  return {
    type: 'SET_USER',
    payload: request
  }

}

export const setProfilePictureUrl = (url) => {
  return {
    type: 'SET_PROFILE_PICTURE_URL',
    payload: url
  }
}
