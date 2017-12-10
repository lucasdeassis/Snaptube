import { combineReducers } from 'redux'
import snapQuery from './reducer_snap_query'
import user from './reducer_user'
import videos from './reducer_videos'

const rootReducer = combineReducers({
  snapQuery,
  user,
  videos
})

export default rootReducer
