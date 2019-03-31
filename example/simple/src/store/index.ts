import { createUseDispatch, createUseMappedState } from 'type-redux-hook';
import { createStore } from '../../../../src';
import * as reducers from './reducers';

const initialState = {
  base: -1,
  baseAddOne: -1,
  arr: [1, 2, 3],
  obj: {
    flag: true,
    el: false
  }
};

const store = createStore(reducers, initialState);

export type IState = typeof initialState;
export type IReducers = typeof reducers;

export const useDispatch = createUseDispatch(store);
export const useMappedState = createUseMappedState(store);
