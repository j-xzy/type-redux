import { IGetState } from './index';

export function content(getState: IGetState, payload: { data: string }) {
  return { ...getState(), content: payload.data };
}

export function fetchNewest(getState: IGetState) {
  return { ...getState(), loading: 'fetching...' };
}

export function cancel(getState: IGetState) {
  return { ...getState(), loading: 'cancel' };
}
