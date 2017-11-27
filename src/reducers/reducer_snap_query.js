const query = (state = '', action) => {
  switch (action.type) {
    case 'SNAP_SEARCHED':
      return action.search;
    default:
      return state;
  }
};

export default query;
