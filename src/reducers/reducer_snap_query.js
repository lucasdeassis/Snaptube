import { ADD_SNAP_QUERY } from '../actions/constants/snap_query_action_types'

const snapQuery = (state = '', action) => {
  switch (action.type) {
    case ADD_SNAP_QUERY:
      return action.payload
    default:
      return state
  }
}

export default snapQuery
