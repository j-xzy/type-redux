export type IReducer<S> = (data: any, state: S) => S;
export type IReducerAsync<S> = (data: any, state: () => S) => Promise<S>;

export interface IReducers<S> {
  [p: string]: IReducer<S> | IReducerAsync<S>;
}

export type IAreEqual<S> = (preState: S, next: S) => boolean;

export type IAnyFunc = (...args: any[]) => any;

export type IAsync<T extends { [p: string]: IAnyFunc }> = { [K in keyof T]: ReturnType<T[K]> extends Promise<any> ? K : never }[keyof T];
