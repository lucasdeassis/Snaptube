import * as actionTypes from '../actions/constants/videos_action_types'

const video = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_VIDEO:
      return action.payload
    case actionTypes.ADD_VIDEO_CAPTION:
      if (!state || (state.video.id.videoId !== action.payload.videoUrl)) {
        return state
      }

      return {
        ...state,
        caption: action.payload.caption
      }
    case actionTypes.SELECT_VIDEO:
      if (!state) {
        return state
      }

      if (state.video.id.videoId !== action.payload.videoUrl) {
        return {
          ...state,
          video: {
            ...state.video,
            [action.payload.selected.property]: false
          }
        }
      }

      return {
        ...state,
        video: {
          ...state.video,
          [action.payload.selected.property]: action.payload.selected.value
        }
      }
    default:
      return state
  }
}

export default video
