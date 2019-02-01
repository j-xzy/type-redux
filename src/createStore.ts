import { IReducers } from './tying';

export class Store<S, T extends IReducers<S>> {

  private state: S;
  private listeners: Array<() => any> = [];

  constructor(private reducers: T, preloadedState: S) {
    this.state = preloadedState;
    this.dispatch = this.dispatch.bind(this);
  }

  public async dispatch<K extends keyof T>(type: K, payload: Parameters<T[K]>[0]) {
    this.state = await this.reducers[type](payload, this.state);
    this.listeners.forEach((callback) => {
      callback();
    });
  }

  public get State() {
    return this.state;
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
}

export function createStore<S, T extends IReducers<S>>(reducers: T, preloadedState: S) {
  return new Store(reducers, preloadedState);
}
