import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from '../../../../src';
import * as actions from './actions';
import * as mutations from './mutations';

const initialState = {
  count: 0,
  repUrl: '',
  loading: false
};

const reducers = { mutations, actions };

export const store = createStore(initialState, reducers, applyMiddleware({ mutations: [createLogger()] }));

type IState = typeof initialState;
export type IGetState = () => IState;
export type ICtx = TypeRedux.IContext<IState, typeof reducers['mutations'], typeof reducers['actions']>;
