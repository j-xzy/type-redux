var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Store {
    constructor(reducers, preloadedState) {
        this.reducers = reducers;
        this.listeners = [];
        this.state = this.lastState = preloadedState;
        this.dispatch = this.dispatch.bind(this);
        this.dispatchAsync = this.dispatchAsync.bind(this);
    }
    dispatch(type, payload) {
        this.lastState = this.state;
        this.state = this.reducers[type](payload, this.state);
        this.notify();
    }
    dispatchAsync(type, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lastState = this.state;
            this.state = yield this.reducers[type](payload, () => this.state);
            this.notify();
        });
    }
    get State() {
        return this.state;
    }
    get LastState() {
        return this.lastState;
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return () => this.unSubscribe(listener);
    }
    unSubscribe(listener) {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }
    notify() {
        this.listeners.forEach((callback) => {
            callback();
        });
    }
}
export function createStore(reducers, preloadedState) {
    return new Store(reducers, preloadedState);
}
//# sourceMappingURL=createStore.js.map