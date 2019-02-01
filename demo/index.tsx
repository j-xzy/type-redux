import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from '../src';
import { App } from './app';

interface IState {
  //
}

function A(data: string, state: IState) {
  return state;
}

function B(data: string, state: IState) {
  return state;
}

export const store = createStore({ A, B }, {});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
