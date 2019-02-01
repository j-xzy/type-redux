import * as React from 'react';
import { Store } from './createStore';
import { IReducers } from './tying';

export function useStore<S, T extends IReducers<S>>(store: Store<S, T>) {
  const [, setState] = React.useState(null);
  React.useEffect(() => {
    const update = () => setState(null);
    const unSubscribe = store.subscribe(update);
    return () => unSubscribe();
  });

  return { state: store.State, dispatch: store.dispatch };
}
