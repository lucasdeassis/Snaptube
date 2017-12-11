import video from './reducer_video'
import * as actionTypes from '../actions/constants/videos_action_types'

const videos = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_VIDEO:
      return [...state, video(undefined, action)]
    case actionTypes.ADD_VIDEO_CAPTION:
      return state.map(v => video(v, action))
    case actionTypes.FILTER_VIDEOS:
      return state.filter(videoSnap => videoSnap.video.id.videoId === action.payload.videoUrl)
    case actionTypes.SELECT_VIDEO:
      return state.map(v => video(v, action))
    default:
      return state
  }
}

export default videos
