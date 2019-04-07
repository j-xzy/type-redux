import { store } from './store';

const $ = (selector: string) => document.querySelector(selector);

store.subscribe(() => {
  const state = store.getState();
  if (state.loading) {
    $('#loading')!.innerHTML = 'fetching...';
  } else {
    $('#loading')!.innerHTML = '';
  }
  $('#content')!.innerHTML = state.content;
});

$('#fetch')!.addEventListener('click', () => {
  store.commit('fetchNewest');
});
