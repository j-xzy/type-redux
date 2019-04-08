import { applyMiddleware, IEnhancer } from './applyMiddleware';

export class Store<
  S,
  M extends TypeRedux.IMutations<S>,
  A extends TypeRedux.IActions<S, M, A>,
  R extends TypeRedux.IReducers<S, M, A>
  > {

  public context: TypeRedux.IContext<S, M, A>;

  private state: S;
  private lastState: S;
  private mutations: R['mutations'];
  private actions: R['actions'];
  private listeners: Array<() => any> = [];

  constructor(preloadedState: S, reducers: R, enhancer: IEnhancer) {
    this.state = this.lastState = preloadedState;
    this.mutations = reducers.mutations;
    this.actions = reducers.actions;

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.getState = this.getState.bind(this);
    this.getLastState = this.getLastState.bind(this);

    this.context = {
      getState: this.getState,
      getLastState: this.getLastState,
      commit: this.commit,
      dispatch: this.dispatch
    };

    const { commit, dispatch  } = enhancer(this.context);
    this.context.commit = this.commit = commit.bind(this);
    this.context.dispatch = this.dispatch = dispatch.bind(this);
  }

  public commit: TypeRedux.ICommit<S, R['mutations']> = (mutation, payload) => {
    if (typeof mutation !== 'string') {
      return this.adapterReduxDispatch(mutation as any);
    }

    this.lastState = this.state;
    this.state = this.mutations[mutation](this.getState, payload);
    this.notify();
  }

  public dispatch: TypeRedux.IDispatch<S, R['mutations'], R['actions']> = async (action, payload) => {
    if (typeof action !== 'string') {
      return this.adapterReduxDispatch(action as any);
    }

    const act = this.actions[action];
    if (/^async/.test(act.toString())) {
      await act(this.context, payload);
    } else {
      act(this.context, payload);
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

  private notify() {
    this.listeners.forEach((callback) => {
      callback();
    });
  }

  private adapterReduxDispatch(action: TypeRedux.ITypePayload) {
    const { type, ...data } = action as any;
    this.commit(((action as any).type), data);
  }
}

export function createStore<
  S,
  M extends TypeRedux.IMutations<S>,
  A extends TypeRedux.IActions<S, M, A>,
  R extends TypeRedux.IReducers<S, M, A>
>(preloadedState: S, reducers: R, enhancer: IEnhancer = applyMiddleware({})) {
  return new Store(preloadedState, reducers, enhancer);
}
