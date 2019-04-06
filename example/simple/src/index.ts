import { store } from './store';

const $ = (selector: string) => document.querySelector(selector);
$('#count')!.innerHTML = store.getState().count + '';
$('#loading')!.innerHTML = 'done';

store.subscribe(() => {
  const state = store.getState();
  if (state.loading) {
    $('#loading')!.innerHTML = 'loading...';
  } else {
    $('#loading')!.innerHTML = 'done';
  }
  $('#count')!.innerHTML = state.count + '';
});

$('#addone')!.addEventListener('click', () => {
  store.commit('addOne');
});

$('#minusone')!.addEventListener('click', () => {
  store.commit('minusOne');
});

$('#set')!.addEventListener('click', () => {
  store.commit('set', Number(($('#setipt') as any).value));
});

$('#server')!.addEventListener('click', () => {
  store.dispatch('fetchNewestCount');
});
