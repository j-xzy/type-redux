import { Observable, Subject } from 'rxjs';
import { applyMiddleware, createStore } from '../../../../src';
import * as actions from './actions';
import * as mutations from './mutations';

const initialState = {
  count: 0,
  repUrl: '',
  loading: false
};

const reducers = { mutations, actions };

const middleware: TypeRedux.IMutationMiddleware = (ctx) => {
  const ob$ = new Observable();
  const sub$ = new Subject();
  sub$.subscribe((x) => console.log(x));
  return (next) => (mutation) => {
    sub$.next(mutation);
    return next(mutation);
  };
};

export const store = createStore(initialState, reducers, applyMiddleware({ mutations: [] }));

type IState = typeof initialState;
export type IGetState = () => IState;
export type ICtx = TypeRedux.IContext<IState, typeof reducers['mutations'], typeof reducers['actions']>;
