import snapQuery from './reducer_snap_query'
import deepFreeze from 'deep-freeze'
import { createStore } from 'redux'
import { addSnapQuery } from '../actions/index'

test('search term', () => {
  const stateBefore = ''
  const action = addSnapQuery('you shall not pass')
  const stateAfter = 'you shall not pass'

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(snapQuery(stateBefore, action)).toBe(stateAfter)
})

test('gets default search term on unknown action', () => {
  const stateBefore = ''
  const action = {
    type: 'SNAP_TYPE_NOT_CATEGORIZED',
    search: `aka don't know`
  }
  const stateAfter = ''

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(snapQuery(stateBefore, action)).toBe(stateAfter)
})

test('gets default search term on create store', () => {
  const store = createStore(snapQuery)
  const initialState = ''

  expect(store.getState()).toBe(initialState)
})
