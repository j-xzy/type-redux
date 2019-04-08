export type IEnhancer = ReturnType<typeof applyMiddleware>;
interface IProps {
  mutations: TypeRedux.IMutationMiddleware[];
  actions: TypeRedux.IActionMiddleware[];
}

export function applyMiddleware({ mutations, actions }: Partial<IProps>) {
  return (ctx: TypeRedux.IContext<any, any, any>) => {
    const mutationChain = (mutations || []).map((middleware) => middleware(ctx));
    const result = {
      commit: ctx.commit,
      dispatch: ctx.dispatch
    };

    if (mutationChain.length > 0) {
      const commit = ctx.commit;

      const middleCommit: ReturnType<ReturnType<TypeRedux.IMutationMiddleware>> = (param) => {
        const { type, payload } = param;
        commit(type, payload);
        return ctx.getState();
      };

      if (mutationChain.length === 1) {
        result.commit = (type: any, payload: any) => mutationChain[0]((action) => middleCommit(action))({ type, payload });
      } else {
        result.commit = (type: any, payload: any) => mutationChain.reduce((a, b) => (...args) => a(b(...args)))((action) => middleCommit(action))({ type, payload });
      }
    }

    return result;
  };
}
