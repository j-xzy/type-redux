export type IEnhancer = ReturnType<typeof applyMiddleware>;

export function applyMiddleware(...middlewares: TypeRedux.IMiddleware[]) {
  return (ctx: TypeRedux.IContext<any, any, any>) => {
    const chain = middlewares.map((middleware) => middleware(ctx));
    if (chain.length === 0) {
      return ctx.commit;
    }

    const commit = ctx.commit;

    const middleCommit: ReturnType<ReturnType<TypeRedux.IMiddleware>> = (param) => {
      const { type, payload } = param;
      commit(type, payload);
      return ctx.getState();
    };

    if (chain.length === 1) {
      return (type: string, payload: any) => chain[0]((action) => middleCommit(action))({ type, payload });
    }

    return (type: string, payload: any) => chain.reduce((a, b) => (...args) => a(b(...args)))((action) => middleCommit(action))({ type, payload });
  };
}
