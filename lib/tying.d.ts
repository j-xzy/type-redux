export declare type IDispatch<S, T extends IReducers<S>> = <K extends Exclude<keyof T, IAsync<T>>>(type: K, payload: Parameters<T[K]>[0]) => void;
export declare type IDispatchAsync<S, T extends IReducers<S>> = <K extends IAsync<T>>(type: K, payload: Parameters<T[K]>[0]) => Promise<any>;
export interface IAsyncDispatch<S, T extends IReducers<S>> {
    dispatch: IDispatch<S, T>;
    dispatchAsync: IDispatchAsync<S, T>;
}
export declare type IReducer<S> = (data: any, state: S, dispatch?: IDispatch<S, IReducers<S>>) => S;
export declare type IReducerAsync<S> = (data: any, state: () => S, dispatch: IAsyncDispatch<S, IReducers<S>>) => Promise<S>;
export interface IReducers<S> {
    [p: string]: IReducerAsync<S> | IReducer<S>;
}
export declare type IAnyFunc = (...args: any[]) => any;
export declare type IAsync<T extends {
    [p: string]: IAnyFunc;
}> = {
    [K in keyof T]: ReturnType<T[K]> extends Promise<any> ? K : never;
}[keyof T];
