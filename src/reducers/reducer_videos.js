const videos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return [...state, {
        url: action.payload.url,
        caption: action.payload.caption
      }];
    case 'FILTER_VIDEOS':
      return state.filter( video => video.url === action.payload );
    default:
      return state;
  }
}

export default videos;
