const searchSnap = (text) => {
  return {
    type: 'SEARCH_SNAP',
    payload: text
  }
}

const addVideoSnap = (url, caption) => {
  return {
    type: 'ADD_VIDEO',
    payload: url,
    caption: caption
  }
}

export { searchSnap, addVideoSnap };
