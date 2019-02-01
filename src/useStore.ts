import * as React from 'react';
import { Store } from './createStore';
import { IAreEqual, IReducers } from './tying';

export function useStore<S, T extends IReducers<S>>(store: Store<S, T>, areEqual: IAreEqual<S> = () => false) {
  const [, setState] = React.useState(null);
  React.useEffect(() => {
    const update = () => {
      areEqual(store.LastState, store.State) || setState(null);
    };
    const unSubscribe = store.subscribe(update);
    return () => unSubscribe();
  });

  return { state: store.State, dispatch: store.dispatch };
}
