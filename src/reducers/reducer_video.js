/**
 *
 * @param {*} state
 * video : {
  "kind": "youtube#searchResult",
  "etag": etag,
  "id": {
    "kind": string,
    "videoId": string,
    "channelId": string,
    "playlistId": string
  },
  "snippet": {
    "publishedAt": datetime,
    "channelId": string,
    "title": string,
    "description": string,
    "thumbnails": {
      (key): {
        "url": string,
        "width": unsigned integer,
        "height": unsigned integer
      }
    },
    "channelTitle": string
  }
 * }
 *
 */
const video = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return action.payload
    case 'ADD_VIDEO_CAPTION':
      if (!state || (state.video.id.videoId !== action.payload.videoUrl)) {
        return state
      }

      return {
        ...state,
        caption: action.payload.caption
      }
    case 'SELECT_VIDEO':
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
