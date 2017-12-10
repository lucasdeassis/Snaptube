const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'SET_PROFILE_PICTURE_URL':
      return {
        ...state,
        imageUrl: action.payload
      }
    default:
      return state
  }
}

export default user
