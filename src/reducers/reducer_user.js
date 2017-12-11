import * as actionTypes from '../actions/constants/user_action_types'

const user = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload
    case actionTypes.SET_PROFILE_PICTURE_URL:
      return {
        ...state,
        imageUrl: action.payload
      }
    default:
      return state
  }
}

export default user
