import { createStore } from '../../../lib';
import { initialState, reducers } from '../src/store';

describe('mutation', () => {
  let store = createStore(initialState, reducers);

  beforeEach(() => {
    store = createStore(initialState, reducers);
  });

  it('add', () => {
    store.commit('add', 10);
    expect(store.getState().count).toBe(10);
  });

  it('count', () => {
    store.commit('minus', -2);
    expect(store.getState().count).toBe(2);
  });
});
