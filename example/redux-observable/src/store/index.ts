import { createEpicMiddleware } from 'redux-observable'
import { applyMiddleware, createStore } from '../../../../src';
import rootEpic from '../epics';
import * as mutations from './mutations';

const epicMiddleware = createEpicMiddleware();

const initialState = {
  content: '',
  loading: false
};

const reducers = { mutations, actions: {} };

export const store = createStore(initialState, reducers, applyMiddleware(epicMiddleware as any));

epicMiddleware.run(rootEpic);

type IState = typeof initialState;
export type IGetState = () => IState;
export type ICtx = TypeRedux.IContext<IState, typeof reducers['mutations'], typeof reducers['actions']>;
