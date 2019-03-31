import { applyMiddleware } from './applyMiddleware';
import { IAction, IDispatch, IDispatchAsync, IReducer, IReducerAsync, IReducers } from './tying';

export class Store<S, T extends IReducers<S>> {

  private _state: S;
  private lastState: S;
  private listeners: Array<() => any> = [];

  public get State() {
    return this._state;
  }

  constructor(private reducers: T, preloadedState: S, enchancer?: ReturnType<typeof applyMiddleware>) {
    this._state = this.lastState = preloadedState;
    this.dispatch = this.dispatch.bind(this);
    this.dispatchAsync = this.dispatchAsync.bind(this);
  }

  public dispatch: IDispatch<S, T> = (type, payload) => {
    this.lastState = this._state;
    this._state = (this.reducers[type] as IReducer<S>)(payload, () => this.State, this.dispatch);
    this.notify();
  }

  public dispatchAsync: IDispatchAsync<S, T> = async (type, payload) => {
    this.lastState = this._state;
    this._state = await (this.reducers[type] as IReducerAsync<S>)(
      payload,
      () => this.State,
      {
        dispatch: this.dispatch,
        dispatchAsync: this.dispatchAsync
      });
    this.notify();
  }

  public get LastState() {
    return this.lastState;
  }

  public subscribe(listener: () => any) {
    this.listeners.push(listener);
    return () => this.unSubscribe(listener);
  }

  public unSubscribe(listener: () => any) {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notify() {
    this.listeners.forEach((callback) => {
      callback();
    });
  }
}

export function createStore<S, T extends IReducers<S>>(reducers: T, preloadedState: S, enhancer?: ReturnType<typeof applyMiddleware>) {
  return new Store(reducers, preloadedState, enhancer);
}
