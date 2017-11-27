import query from './reducer_snap_query';
import deepFreeze from 'deep-freeze';
import snapSearchAction from '../actions/index';

test('gets new search term', () => {
  const stateBefore = '';
  const action = new snapSearchAction('you shall not pass');
  const stateAfter = 'you shall not pass';

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(query(stateBefore, action)).toBe(stateAfter);
});
