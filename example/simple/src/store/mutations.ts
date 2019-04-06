import { IGetState } from './index';

export function addOne(getState: IGetState) {
  return { ...getState(), count: getState().count + 1 };
}

export function minusOne(getState: IGetState) {
  return { ...getState(), count: getState().count - 1 };
}

export function add(getState: IGetState, payload: number) {
  return { ...getState(), count: getState().count + payload };
}

export function minus(getState: IGetState, payload: number) {
  return { ...getState(), count: getState().count - payload };
}

export function set(getState: IGetState, payload: number) {
  return { ...getState(), count: payload };
}
