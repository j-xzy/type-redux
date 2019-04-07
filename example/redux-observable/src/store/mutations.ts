import { IGetState } from './index';

export function content(getState: IGetState, payload: { data: string }) {
  return { ...getState(), content: payload.data };
}

export function loading(getState: IGetState, flag: boolean) {
  return { ...getState(), loading: flag };
}

export function fetchNewest(getState: IGetState) {
  return { ...getState() };
}
