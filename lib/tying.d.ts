export declare type IReducer<S> = (data: any, state: S) => S;
export declare type IReducerAsync<S> = (data: any, state: () => S) => Promise<S>;
export interface IReducers<S> {
    [p: string]: IReducer<S> | IReducerAsync<S>;
}
export declare type IAnyFunc = (...args: any[]) => any;
export declare type IAsync<T extends {
    [p: string]: IAnyFunc;
}> = {
    [K in keyof T]: ReturnType<T[K]> extends Promise<any> ? K : never;
}[keyof T];
