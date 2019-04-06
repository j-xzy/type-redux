export type IMutation<S> = (getState: () => S, payload: any) => S;

export type IAction<S, M extends IMutations<S>, A extends IActions<S, M, A>> = (ctx: IContext<S, M, A>, payload: any) => any;

export interface IKeyValue<T> {
  [p: string]: T;
}

export type IActions<S, M extends IMutations<S>, A extends IActions<S, M, A>> = IKeyValue<IAction<S, M, A>>;

export type IMutations<S> = IKeyValue<IMutation<S>>;

export interface IContext<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
  getState: () => S;
  dispatch: IDispatch<S, M, A>;
  commit: ICommit<S, M>;
}

export type ICommit<S, M extends IMutations<S>> = <K extends keyof M>(mutation: K, payload?: Parameters<M[K]>[1]) => void;

export type IDispatch<S, M extends IMutations<S>, A extends IActions<S, M, A>> = <K extends keyof A>(action: K, payload?: Parameters<A[K]>[1]) => Promise<any>;

export interface IReducers<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
  actions: IActions<S, M, A>;
  mutations: IMutations<S>;
}
