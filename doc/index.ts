import { createStore, IAsyncDispatch, IDispatch } from '../src';

const initialState = {
  count: 0
};

type IState = typeof initialState;

function add(data: number, state: IState, dispatch: IDispatch<IState, typeof reducers>) {
  return { ...state, count: state.count + data };
}

function minus(data: number, state: IState) {
  return { ...state, count: state.count - data };
}

function clear(data: null, state: IState) {
  return { ...state, count: 0 };
}

async function foo(data: null, getState: () => IState, { dispatch, dispatchAsync }: IAsyncDispatch<IState, typeof reducers>) {
  await fetch('/xxx');
  return { ...getState() };
}

const reducers = { add, minus, clear, foo };

const store = createStore(reducers, initialState);

type a = typeof store;

store.dispatch('add', 1);
store.dispatch('minus', 2);

store.dispatchAsync('foo', null);
