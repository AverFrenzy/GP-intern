import { createStore } from 'redux';
import { listState } from './reducers';

const store = createStore(
  listState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
