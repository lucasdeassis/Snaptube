import { combineReducers } from 'redux'
import query from './reducer_snap_query'
import videos from './reducer_videos'

const rootReducer = combineReducers({
  query,
  videos
})

export default rootReducer
