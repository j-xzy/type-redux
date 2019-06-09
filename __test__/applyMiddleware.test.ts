import { applyMiddleware, createStore } from '../src';

it('applyMiddleware', () => {
  const fn = jest.fn();

  const middleware: TypeRedux.IMiddleware = () => {
    return (next) => (mutation) => {
      fn(mutation);
      return next(mutation);
    };
  };

  const store = createStore({ count: 0 }, {
    actions: {},
    mutations: { add: (getState, payload: number) => ({ count: getState().count + payload }) }
  }, applyMiddleware(middleware));

  expect(fn.mock.calls.length).toBe(0);

  store.commit('add', 10);

  expect(fn.mock.calls[0]).toEqual([{ type: 'add', payload: 10 }]);
  expect(store.getState().count).toBe(10);
});

it('applyMiddleware two', () => {
  const fn1 = jest.fn();

  const middleware1: TypeRedux.IMiddleware = () => {
    return (next) => (mutation) => {
      fn1(mutation);
      return next(mutation);
    };
  };

  const fn2 = jest.fn();

  const middleware2: TypeRedux.IMiddleware = () => {
    return (next) => (mutation) => {
      fn2(mutation);
      return next(mutation);
    };
  };

  const store = createStore({ count: 0 }, {
    actions: {},
    mutations: { add: (getState, payload: number) => ({ count: getState().count + payload }) }
  }, applyMiddleware(middleware1, middleware2));

  expect(fn1.mock.calls.length).toBe(0);
  expect(fn2.mock.calls.length).toBe(0);

  store.commit('add', 10);

  expect(fn1.mock.calls[0]).toEqual([{ type: 'add', payload: 10 }]);
  expect(fn2.mock.calls[0]).toEqual([{ type: 'add', payload: 10 }]);

  expect(store.getState().count).toBe(10);
});
