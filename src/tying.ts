export type IReducer<T> = (data: any, state: T) => T;

export interface IReducers<T> {
  [p: string]: IReducer<T>;
}
