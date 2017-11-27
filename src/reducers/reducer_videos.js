const videos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return [...state, {
        url: action.payload,
        caption: action.caption
      }];
    default:
      return state;
  }
}

export default videos;
