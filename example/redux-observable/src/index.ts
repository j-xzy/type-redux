import { store } from './store';

const $ = (selector: string) => document.querySelector(selector);

store.subscribe(() => {
  const state = store.getState();
  $('#loading')!.innerHTML = state.loading;
  $('#content')!.innerHTML = state.content;
});

$('#fetch')!.addEventListener('click', () => {
  store.commit('fetchNewest');
});

$('#cancel')!.addEventListener('click', () => {
  store.commit('cancel');
});
