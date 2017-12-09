export const addVideoSnap = (video, caption) => {
  return {
    type: 'ADD_VIDEO',
    payload: {
      video,
      caption
    }
  }
}


export const addVideoCaption = (videoUrl, caption) => {
  return {
    type: 'ADD_VIDEO_CAPTION',
    payload: {
      videoUrl,
      caption
    }
  }
}


export const filterVideos = (url) => {
  return {
    type: 'FILTER_VIDEOS',
    payload: {
      url
    }
  }
}
