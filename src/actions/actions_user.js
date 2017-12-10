export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

export const setProfilePictureUrl = (url) => {
  return {
    type: 'SET_PROFILE_PICTURE_URL',
    payload: url
  }
}
