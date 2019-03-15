import { createStore } from '../src';

const initialState = {
  count: 0
};

type IState = typeof initialState;

function add(data: number, state: IState) {
  return { ...state, count: state.count + data };
}

function minus(data: number, state: IState) {
  return { ...state, count: state.count - data };
}

function clear(data: null, state: IState) {
  return { ...state, count: 0 };
}

async function foo(data: null, getState: () => IState) {
  await fetch('/xxx');
  return { ...getState() };
}

const store = createStore({ add, minus, clear, foo }, initialState);

store.dispatch('add', 1);
store.dispatch('minus', 2);

store.dispatchAsync('foo', null);
