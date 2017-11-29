import query from './reducer_snap_query';
import deepFreeze from 'deep-freeze';
import { createStore } from 'redux';
import { searchSnap } from '../actions/index';

test('search term', () => {
  const stateBefore = '';
  const action = searchSnap('you shall not pass');
  const stateAfter = 'you shall not pass';

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(query(stateBefore, action)).toBe(stateAfter);
});

test('gets default search term on unknown action', () => {
  const stateBefore = '';
  const action =  {
    type: 'SNAP_TYPE_NOT_CATEGORIZED',
    search: `aka don't know`
  }
  const stateAfter = '';

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(query(stateBefore, action)).toBe(stateAfter);
});

test('gets default search term on create store', () => {
  const store = createStore(query);
  const initialState = '';

  expect(store.getState()).toBe(initialState);
});
