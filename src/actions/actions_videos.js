export const addVideoSnap = (url, caption) => {
  return {
    type: 'ADD_VIDEO',
    payload: {
      url,
      caption
    }
  }
}


export const addVideoCaption = (url, caption) => {
  return {
    type: 'ADD_VIDEO_CAPTION',
    payload: {
      url,
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
