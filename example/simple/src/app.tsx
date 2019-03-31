import * as React from 'react';
import { useDispatch, useMappedState } from './store';

export function App() {
  return (
    <div>
      <Base />
      <BaseAddOne />
      <Arr />
      <Obj />
    </div>
  );
}

function Base() {
  const base = useMappedState((s) => s.base);
  const dispatch = useDispatch(true);
  return (
    <div>
      base: {base}
      <button onClick={() => dispatch('getBase', null)}>fetch Base</button>
    </div>
  );
}

function BaseAddOne() {
  const baseAddOne = useMappedState((s) => s.baseAddOne);
  const dispatch = useDispatch(true);

  return (
    <div>
      Base+1: {baseAddOne}
      <button onClick={() => dispatch('baseAddOne', null)}>fetch BaseAddOne</button>
    </div>
  );
}

function Arr() {
  const arr = useMappedState((s) => s.arr);
  const dispatch = useDispatch();
  return (
    <div>
      arr: {arr.join(';')}
      <button onClick={() => dispatch('actionArr', [Math.random(), Math.random()])}>changeArr</button>
    </div>
  );
}

function Obj() {
  const obj = useMappedState((s) => s.obj);
  const dispatch = useDispatch();
  return (
    <div>
      obj: {JSON.stringify(obj)}
      <button onClick={() => dispatch('actionObj', { flag: Math.random() > 0.5, el: Math.random() > 0.5 })}>changeObj</button>
    </div>
  );
}
