import * as actionTypes from './constants/videos_action_types'

export const addVideoSnap = (video, caption) => {
  return {
    type: actionTypes.ADD_VIDEO,
    payload: {
      video,
      caption
    }
  }
}

export const addVideoCaption = (videoUrl, caption) => {
  return {
    type: actionTypes.ADD_VIDEO_CAPTION,
    payload: {
      videoUrl,
      caption
    }
  }
}

export const filterVideos = (videoUrl) => {
  return {
    type: actionTypes.FILTER_VIDEOS,
    payload: {
      videoUrl
    }
  }
}

export const selectVideo = (videoUrl, selected) => {
  return {
    type: actionTypes.SELECT_VIDEO,
    payload: {
      videoUrl,
      selected: {
        property: 'selected',
        value: selected
      }
    }
  }
}
