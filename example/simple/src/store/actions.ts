import { ICtx } from './index';
export async function fetchNewestCount(ctx: ICtx) {
  await ctx.dispatch('fetchRepurl');
  const result = await fetch(ctx.getState().repUrl).then((raw) => raw.json());
  ctx.commit('set', result.length);
  ctx.commit('loading', false);

}

export async function fetchRepurl(ctx: ICtx) {
  ctx.commit('loading', true);
  const user = await fetch('https://api.github.com/users/whj1995').then((raw) => raw.json());
  ctx.commit('repUrl', user.repos_url);
}
