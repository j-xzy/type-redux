import { createStore } from 'type-redux';
import { initialState, reducers } from '../src/store';

describe('mutation', () => {
  let store = createStore(initialState, reducers);

  beforeEach(() => {
    store = createStore(initialState, reducers);
  });

  it('count', () => {
    store.commit('add', 10);
    expect(store.getState().count).toBe(10);
  });
});
