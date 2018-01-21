import { ADD_SNAP_QUERY } from './constants/snap_query_action_types'

export const addSnapQuery = (text) => {
  return {
    type: ADD_SNAP_QUERY,
    payload: text
  }
}
