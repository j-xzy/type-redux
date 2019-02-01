import { IListItem, IState } from './index';

export function append(text: string, state: IState) {
  const maxId = state.maxId + 1;
  const nextState: IState = { ...state, list: [...state.list, { id: maxId, text, done: false }], maxId };
  return nextState;
}

export function toggle(id: number, state: IState) {
  let index = -1;
  const todo = state.list.find((item, idx) => {
    if (item.id === id) {
      index = idx;
      return true;
    }
    return false;
  });

  if (!todo) {
    return state;
  }

  const done = !todo.done;
  const list = [...state.list];
  list.splice(index, 1, { ...state.list[index], done });

  return { ...state, list };
}

export function getListAsync(data: null, state: IState) {
  return state;
}
