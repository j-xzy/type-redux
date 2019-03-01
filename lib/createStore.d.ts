import { IAsync, IReducers } from './tying';
export declare class Store<S, T extends IReducers<S>> {
    private reducers;
    private state;
    private lastState;
    private listeners;
    constructor(reducers: T, preloadedState: S);
    dispatch<K extends Exclude<keyof T, IAsync<T>>>(type: K, payload: Parameters<T[K]>[0]): void;
    dispatchAsync<K extends IAsync<T>>(type: K, payload: Parameters<T[K]>[0]): Promise<void>;
    readonly State: S;
    readonly LastState: S;
    subscribe(listener: () => any): () => void;
    unSubscribe(listener: () => any): void;
    private notify;
}
export declare function createStore<S, T extends IReducers<S>>(reducers: T, preloadedState: S): Store<S, T>;
