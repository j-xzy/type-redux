import { createStore } from '../../../lib';
import { initialState, reducers } from '../src/store';

window.fetch = (url: string) => new Promise((resolve, reject) => {
  if (url === 'https://api.github.com/users/whj1995') {
    resolve({
      json: () => new Promise((resolve2) => resolve2({ repos_url: 'rep' }))
    } as any);
  }
  if (url === 'rep') {
    resolve({
      json: () => new Promise((resolve2) => resolve2([1, 2, 3]))
    } as any);
  }
});

describe('action', () => {
  let store = createStore(initialState, reducers);

  beforeEach(() => {
    store = createStore(initialState, reducers);
  });

  it('fetchNewestCount', async () => {
    await store.dispatch('fetchNewestCount');
    expect(store.getState().count).toBe(3);
    expect(store.getState().loading).toBe(false);
  });
});
