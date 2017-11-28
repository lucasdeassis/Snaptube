export const searchSnap = text => {
  return {
    type: 'SEARCH_SNAP',
    payload: text
  }
}

export const addVideoSnap = (url, caption) => {
  return {
    type: 'ADD_VIDEO',
    payload: {
      url,
      caption
    }
  }
}

export const filterVideos = (url) => {
  return {
    type: 'FILTER_VIDEOS',
    payload: url
  }
}
