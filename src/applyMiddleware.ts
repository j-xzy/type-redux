import { Store } from './createStore';
import { IAction, IMiddleware, IReducers } from './tying';

export const applyMiddleware = <S, T extends IReducers<S>>(...middlewares: Array<IMiddleware<S>>) => {
  return (store: Store<S, T>) => {
    const middlewareApi = {
      getState: () => store.State,
      dispatch: () => {
        throw new Error('不允许在中间件中调用dispatch');
      }
    };


    const chain = middlewares.map((middleware) => middleware(middlewareApi));

    if (chain.length === 1) {
      return chain[0];
    }

    return chain.reduce((a, b) => (action: IAction<S>) => a(b(action)));
  };
};
