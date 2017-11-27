const query = (state = '', action) => {
  switch (action.type) {
    case 'SNAP_SEARCHED':
      return action.payload;
    default:
      return state;
  }
};

export default query;
