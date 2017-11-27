import deepFreeze from 'deep-freeze';
import { addVideoSnap } from '../actions/index';
import { createStore } from 'redux';
import videos from './reducer_videos';

test('add new video', () => {
  const stateBefore = [];
  const action = addVideoSnap('v23dsG3dfdgh23',
    `0:00:07.799,0:00:10.559 how to walk on a leash without pulling`);
  const stateAfter = [{
    url: 'v23dsG3dfdgh23',
    caption: `0:00:07.799,0:00:10.559 how to walk on a leash without pulling`
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(videos(stateBefore, action)).toEqual(stateAfter);
});

test('add new video with empty caption', () => {
  const stateBefore = [];
  const action = new addVideoSnap('v23dsG3dfdgh23', '');

  const stateAfter = [{
    url: 'v23dsG3dfdgh23',
    caption: ``
  }];
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(videos(stateBefore, action)).toEqual(stateAfter);
});

test('gets default state on unknown action', () => {
  const stateBefore = [];
  const action = {
    type: 'NO_KNOWN_TYPE',
    payload: `sqwd13edsf`
  }
  const stateAfter = [];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(videos(stateBefore, action)).toEqual(stateAfter);
});

test('gets default state term on create store', () => {
  const store = createStore(videos);
  const initialState = [];

  expect(store.getState()).toEqual(initialState);
});
