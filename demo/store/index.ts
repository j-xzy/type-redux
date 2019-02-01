import { createStore, IAreEqual, useStore as useRawStore } from '../../src';
import * as todo from './todo';

export interface IListItem {
  id: number;
  done: boolean;
  text: string;
}

export interface IState {
  list: IListItem[];
  selectedIds: number[];
  maxId: number;
}

const state: IState = {
  list: [],
  selectedIds: [],
  maxId: 0
};

const store = createStore(todo, state);

export function useStore(areEqual?: IAreEqual<IState>) {
  return useRawStore(store, areEqual);
}
