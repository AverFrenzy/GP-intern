import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux';
import { PartyContextProvider } from './components/contexts/PartyContext';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <PartyContextProvider>
      <App />
    </PartyContextProvider>
  </Provider>,
  document.getElementById('root')
);
