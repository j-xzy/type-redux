declare namespace TypeRedux {
  type IMutation<S> = (getState: () => S, payload: any) => S;

  type IAction<S, M extends IMutations<S>, A extends IActions<S, M, A>> = (ctx: IContext<S, M, A>, payload: any) => any;

  interface IKeyValue<T> {
    [p: string]: T;
  }

  type IActions<S, M extends IMutations<S>, A extends IActions<S, M, A>> = IKeyValue<IAction<S, M, A>>;

  type IMutations<S> = IKeyValue<IMutation<S>>;

  interface IContext<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
    getState: () => S;
    getLastState: () => S;
    dispatch: IDispatch<S, M, A>;
    commit: ICommit<S, M>;
  }

  type ICommit<S, M extends IMutations<S>> = <K extends keyof M>(mutation: K, payload?: Parameters<M[K]>[1]) => void;

  type IDispatch<S, M extends IMutations<S>, A extends IActions<S, M, A>> = <K extends keyof A>(action: K, payload?: Parameters<A[K]>[1]) => Promise<any>;

  interface IReducers<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
    actions: A;
    mutations: M;
  }

  interface ITypePayload {
    type: string;
    [p: string]: any;
  }

  interface IStore<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
    context: IContext<S, M, A>;
    commit: ICommit<S, M>;
    dispatch: IDispatch<S, M, A>;
    subscribe: (callback: (...args: any[]) => any) => () => void;
    unSubscribe: (...args: any[]) => any;
    getState: () => S;
    getLastState: () => S;
  }

  type IMiddleware = <S, M extends IMutations<S>, A extends IActions<S, M, A>>
    (store: IStore<S, M, A>)
    => (next: (mutation: ITypePayload) => S)
      => (mutation: ITypePayload) => S;
}
