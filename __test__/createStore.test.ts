import { createStore } from '../src';

it('subscribe', () => {
  const store = createStore({}, {
    actions: {
      actmut: (ctx) => { ctx.commit('mut'); },
      act: (ctx) => { /** */ }
    },
    mutations: { mut: () => ({}) }
  });

  const listener = jest.fn();
  store.subscribe(listener);

  expect(listener.mock.calls.length).toBe(0);

  store.commit('mut');
  expect(listener.mock.calls.length).toBe(1);

  store.dispatch('actmut');
  expect(listener.mock.calls.length).toBe(2);

  store.dispatch('act');
  expect(listener.mock.calls.length).toBe(2);
});

it('Store.unSubscribe', () => {
  const store = createStore({}, {
    actions: {},
    mutations: { mut: () => ({}) }
  });

  const listener = jest.fn();
  store.subscribe(listener);

  expect(listener.mock.calls.length).toBe(0);

  store.unSubscribe(() => {/** */ });

  store.commit('mut');

  expect(listener.mock.calls.length).toBe(1);

  store.unSubscribe(listener);

  store.commit('mut');

  expect(listener.mock.calls.length).toBe(1);
});

it('return unsubscribe', () => {
  const store = createStore({}, {
    actions: {},
    mutations: { mut: () => ({}) }
  });

  const listener = jest.fn();
  const unSubscribe = store.subscribe(listener);

  expect(listener.mock.calls.length).toBe(0);

  unSubscribe();

  store.commit('mut');

  expect(listener.mock.calls.length).toBe(0);
});

it('mutation', () => {
  const store = createStore({ count: 0 }, {
    actions: {},
    mutations: { add: (getState, payload: number) => ({ count: getState().count + payload }) }
  });

  expect(store.getState().count).toBe(0);

  store.commit('add', 10);

  expect(store.getState().count).toBe(10);
});

it('action', async () => {
  const store = createStore({ count: 0 }, {
    actions: { act: (ctx) => { ctx.commit('add', 10); } },
    mutations: { add: (getState, payload: number) => ({ count: getState().count + payload }) }
  });

  expect(store.getState().count).toBe(0);

  store.dispatch('act');

  expect(store.getState().count).toBe(10);
});

it('async action', async () => {
  const store = createStore({ count: 0 }, {
    actions: { act: async (ctx) => { ctx.commit('add', 10); } },
    mutations: { add: (getState, payload: number) => ({ count: getState().count + payload }) }
  });

  expect(store.getState().count).toBe(0);

  store.dispatch('act');

  expect(store.getState().count).toBe(10);
});

it('no found commit and action', () => {
  const store = createStore({}, {
    actions: { act: () => {/** */ } },
    mutations: { mut: () => ({}) }
  });

  const listener = jest.fn();
  store.subscribe(listener);

  store.commit('foo' as any);
  store.dispatch('foo' as any);

  expect(listener.mock.calls.length).toBe(0);
});

it('lastState', () => {
  const store = createStore({ count: 0 }, {
    actions: {},
    mutations: { add: (getState, payload: number) => ({ count: getState().count + payload }) }
  });

  expect(store.getLastState().count).toBe(0);
  expect(store.getState().count).toBe(0);

  store.commit('add', 10);

  expect(store.getLastState().count).toBe(0);
  expect(store.getState().count).toBe(10);

  store.commit('add', 10);

  expect(store.getLastState().count).toBe(10);
  expect(store.getState().count).toBe(20);
});

it('adapter-redux-action', () => {
  const store = createStore({ count: 0 }, {
    actions: {},
    mutations: { add: (getState) => ({ count: getState().count + 1 }) }
  });

  (store.dispatch as any)({ type: 'add' });

  expect(store.getState().count).toBe(1);

  (store.commit as any)({ type: 'add' });

  expect(store.getState().count).toBe(2);

  (store.commit as any)(() => {/** */ });

  expect(store.getState().count).toBe(2);
});
