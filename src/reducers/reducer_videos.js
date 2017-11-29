import video from './reducer_video';

const videos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return [...state, video(undefined, action)];
    case 'ADD_VIDEO_CAPTION':
      return state.map( v => video(v, action));
    case 'FILTER_VIDEOS':
      return state.filter(video => video.url === action.payload.url);
    default:
      return state;
  }
}

export default videos;
