export type IReducer<T> = (data: any, state: T) => T;

export interface IReducers<T> {
  [p: string]: IReducer<T>;
}

export type IAreEqual<T> = (preState: T, next: T) => boolean;
