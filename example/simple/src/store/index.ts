import { createStore, IContext } from '../../../../src';
import * as actions from './actions';
import * as mutations from './mutations';

const initialState = {
  count: 0,
  repUrl: '',
  loading: false
};

const reducers = { mutations, actions };

export const store = createStore(initialState, reducers);

type IState = typeof initialState;
export type IGetState = () => IState;
export type ICtx = IContext<IState, typeof reducers['mutations'], typeof reducers['actions']>;
