const video = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return {
        url: action.payload.url,
        caption: action.payload.caption
      }
    case 'ADD_VIDEO_CAPTION':
      if (state.url !== action.payload.url) {
        return state
      }

      return Object.assign({}, state, {
        caption: action.payload.caption

      })
    default:
      return state
  }
}

export default video
