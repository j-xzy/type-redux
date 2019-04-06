import { IActions, ICommit, IDispatch, IMutations, IReducers } from './typing';

export class Store<S, M extends IMutations<S>, A extends IActions<S, M, A>, R extends IReducers<S, M, A>> {
  private state: S;
  private lastState: S;
  private mutations: R['mutations'];
  private actions: R['actions'];
  private listeners: Array<() => any> = [];

  constructor(preloadedState: S, reducers: R) {
    this.state = this.lastState = preloadedState;
    this.mutations = reducers.mutations;
    this.actions = reducers.actions;

    this.dispatch = this.dispatch.bind(this);
    this.commit = this.commit.bind(this);
    this.getState  = this.getState.bind(this);
    this.getLastState  = this.getLastState.bind(this);
  }

  public commit: ICommit<S, R['mutations']> = (mutation, payload) => {
    this.lastState = this.state;
    this.state = this.mutations[mutation](this.getState, payload);
    this.notify();
  }

  public dispatch: IDispatch<S, R['mutations'], R['actions']> = async (action, payload) => {
    const act = this.actions[action];
    if (/^async/.test(act.toString())) {
      await act(this.context(), payload);
    } else {
      act(this.context(), payload);
    }
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

  public getState() {
    return this.state;
  }

  public getLastState() {
    return this.lastState;
  }

  private context() {
    return {
      getState: this.getState,
      commit: this.commit,
      dispatch: this.dispatch
    };
  }

  private notify() {
    this.listeners.forEach((callback) => {
      callback();
    });
  }
}

export function createStore<S, M extends IMutations<S>, A extends IActions<S, M, A>, R extends IReducers<S, M, A>>(preloadedState: S, reducers: R) {
  return new Store(preloadedState, reducers);
}

// const state = {
//   num: 1
// };

// type IState = typeof state;

// function Muc(getState: () => IState, payload: number) {
//   return getState();
// }

// function Act(ctx: IContext<IState, IM, IA>, payload: string) {
//   ctx.dispatch('Act')
//   ctx.commit('Muc')
// }

// const reducers = {
//   mutations: { Muc },
//   actions: { Act }
// };

// type IM = typeof reducers['mutations'];
// type IA = typeof reducers['actions'];

// const store = createStore(state, reducers);

// store.dispatch('Act', '');
// store.commit('Muc', 1);
// store.dispatch('Act')
