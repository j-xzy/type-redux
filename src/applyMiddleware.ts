export type IEnhancer = ReturnType<typeof applyMiddleware>;

export function applyMiddleware(...middlewares: TypeRedux.IMiddleware[]) {
  return (store: TypeRedux.IStore<any, any, any>) => {
    const mutationChain = middlewares.map((middleware) => middleware(store));

    if (mutationChain.length < 1) {
      return store.commit;
    }

    const commit = store.commit;

    const middleCommit: ReturnType<ReturnType<TypeRedux.IMiddleware>> = (param) => {
      const { type, payload } = param;
      commit(type, payload);
      return store.getState();
    };

    if (mutationChain.length === 1) {
      return (type: any, payload: any) => mutationChain[0]((action) => middleCommit(action))({ type, payload });
    } else {
      return (type: any, payload: any) => mutationChain.reduce((a, b) => (...args) => a(b(...args)))((action) => middleCommit(action))({ type, payload });
    }
  };
}
