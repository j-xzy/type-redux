import * as React from 'react';
import { useStore } from './store';

export function App() {
  const { state, dispatchAsync } = useStore();
  React.useEffect(() => {
    dispatchAsync('getListAsync', null);
  }, []);
  return (
    <div>
      {state.list.map((data) => <Item key={data.id} id={data.id} />)}
      <Add />
      maxId:{state.maxId}
    </div>
  );
}

function Item(props: { id: number }) {
  const { state, dispatch } = useStore();
  const item = state.list.find(({ id }) => id === props.id)!;

  return (
    <div onClick={() => dispatch('toggle', props.id)} style={{ textDecoration: item.done ? 'line-through' : 'none', border: '1px solid #000' }}>
      {item.text}
      <button onClick={() => dispatch('deleteItem', props.id)}>X</button>
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
