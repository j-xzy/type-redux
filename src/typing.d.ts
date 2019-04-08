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
    actions: IActions<S, M, A>;
    mutations: IMutations<S>;
  }

  interface ITypePayload {
    type: string;
    [p: string]: any;
  }

  type IMutationMiddleware = <S, M extends IMutations<S>, A extends IActions<S, M, A>>
    (ctx: IContext<S, M, A>)
    => (next: (mutation: ITypePayload) => S)
      => (mutation: ITypePayload) => S

  type IActionMiddleware = <S, M extends IMutations<S>, A extends IActions<S, M, A>>
    (ctx: IContext<S, M, A>)
    => (next: (action: ITypePayload) => any)
      => (action: ITypePayload) => any
}
