import { store } from './store';

const $ = (selector: string) => document.querySelector(selector);
$('#count')!.innerHTML = store.getState().count + '';

store.subscribe(() => {
  $('#count')!.innerHTML = store.getState().count + '';
});

$('#addone')!.addEventListener('click', () => {
  store.commit('addOne');
});

$('#minusone')!.addEventListener('click', () => {
  store.commit('minusOne');
});

$('#set')!.addEventListener('click', (e) => {
  store.commit('set', Number(($('#setipt') as any).value));
});

$('#server')!.addEventListener('click', (e) => {
  store.dispatch('fetchNewestCount');
});
