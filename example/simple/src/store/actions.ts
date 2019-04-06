import { ICtx } from './index';

export async function fetchNewestCount(ctx: ICtx) {
  const result = await fetch('https://api.github.com/users/whj1995/repos').then((raw) => raw.json());
  ctx.commit('set', result.length);
}
