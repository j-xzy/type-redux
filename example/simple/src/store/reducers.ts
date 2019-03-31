import { IAsyncDispatch, IDispatch } from '../../../../src';
import { IReducers, IState } from './index';

export function actionObj(obj: IState['obj'], getState: () => IState, dispatch: IDispatch<IState, IReducers>) {
  // dispatch('actionArr', [Math.random(), Math.random() * 10]);
  return { ...getState(), obj };
}

export function actionArr(arr: number[], getState: () => IState) {
  return { ...getState(), arr };
}

export async function getBase(_param: null, getState: () => IState, { dispatch }: IAsyncDispatch<IState, IReducers>) {
  // dispatch('actionObj', { flag: Math.random() > 0.5, el: Math.random() > 0.5 });
  const { num } = await ((await fetch('/random')).json());
  return { ...getState(), base: num };
}

export async function baseAddOne(_parma: null, getState: () => IState, { dispatchAsync }: IAsyncDispatch<IState, IReducers>) {
  // await dispatchAsync('getBase', null);

  const result = await ((await fetch(
    '/addone',
    {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ num: getState().base })
    })
  ).json());

  return { ...getState(), baseAddOne: result.num };
}
