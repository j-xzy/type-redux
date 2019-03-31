// import { createLogger } from 'redux-logger';
import { createUseDispatch, createUseMappedState } from 'type-redux-hook';
import { applyMiddleware, createStore } from '../../../../src';
import { midd1 } from './middleware';
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

const store = createStore(reducers, initialState, applyMiddleware(midd1));

export type IState = typeof initialState;
export type IReducers = typeof reducers;

export const useDispatch = createUseDispatch(store);
export const useMappedState = createUseMappedState(store);
