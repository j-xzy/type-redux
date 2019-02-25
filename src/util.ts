import * as React from 'react';
import { Store } from './createStore';
import { IReducers } from './tying';

type IMappedStateFunc<S, R> = (state: S) => R;

export function createUseDispatch<S, T extends IReducers<S>>(store: Store<S, T>) {

  function useDispatch(async: false): Store<S, T>['dispatch'];
  function useDispatch(async: true): Store<S, T>['dispatchAsync'];
  function useDispatch(): Store<S, T>['dispatch'];
  function useDispatch(async = false) {
    if (async) {
      return store.dispatchAsync;
    }
    return store.dispatch;
  }

  return useDispatch;
}

export function createUseMappedState<S, T extends IReducers<S>>(store: Store<S, T>) {
  return function useMappedState<R>(mappedState: IMappedStateFunc<S, R>) {
    const [state, setState] = React.useState(mappedState(store.State));
    const lastState = React.useRef(state);

    React.useEffect(() => {
      const unSubscribe = store.subscribe(() => {
        const nextState = mappedState(store.State);
        if (!shallowEqual(lastState.current, nextState)) {
          setState(mappedState(store.State));
        }
        lastState.current = nextState;
      });
      return () => unSubscribe();
    });

    return state;
  };
}

function is(x: any, y: any) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/** 浅比较 */
function shallowEqual(objA: any, objB: any) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
