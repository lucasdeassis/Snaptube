import youtubeApi from '../youtube_api'
import * as actionTypes from './constants/user_action_types'

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
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
    type: actionTypes.SET_USER,
    payload: request
  }

}

export const setProfilePictureUrl = (url) => {
  return {
    type: actionTypes.SET_PROFILE_PICTURE_URL,
    payload: url
  }
}
