import { IAsync, IReducer, IReducerAsync, IReducers } from './tying';

export class Store<S, T extends IReducers<S>> {

  private state: S;
  private lastState: S;
  private listeners: Array<() => any> = [];

  constructor(private reducers: T, preloadedState: S) {
    this.state = this.lastState = preloadedState;
    this.dispatch = this.dispatch.bind(this);
    this.dispatchAsync = this.dispatchAsync.bind(this);
  }

  public dispatch<K extends Exclude<keyof T, IAsync<T>>>(type: K, payload: Parameters<T[K]>[0]) {
    this.lastState = this.state;
    this.state = (this.reducers[type] as IReducer<S>)(payload, this.state);
    this.notify();
  }

  public async dispatchAsync<K extends IAsync<T>>(type: K, payload: Parameters<T[K]>[0]) {
    this.lastState = this.state;
    this.state = await (this.reducers[type] as IReducerAsync<S>)(payload, () => this.state);
    this.notify();
  }

  public get State() {
    return this.state;
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

export function createStore<S, T extends IReducers<S>>(reducers: T, preloadedState: S) {
  return new Store(reducers, preloadedState);
}
