const snapQuery = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH_SNAP':
      return action.payload
    default:
      return state
  }
}

export default snapQuery
