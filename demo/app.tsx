import * as React from 'react';
import { IListItem, IState, useStore } from './store';

export function App() {
  const { state } = useStore();
  return (
    <div>
      {state.list.map((data, idx) => <Item key={idx} {...data} />)}
      <Add />
    </div>
  );
}

function Item(props: IListItem) {
  const { dispatch } = useStore();
  return (
    <div onClick={() => dispatch('toggle', props.id)} style={{ textDecoration: props.done ? 'line-through' : 'none' }}>
      {props.text}
    </div>
  );
}

function Add() {
  const { dispatch } = useStore();
  const [state, setState] = React.useState('');
  return (
    <div>
      <input type='text' value={state} onChange={(e) => setState(e.target.value)} />
      <button onClick={() => { dispatch('append', state), setState(''); }}>增加</button>
    </div>
  );
}
