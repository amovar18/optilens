import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './main.scss'
import store from './store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import Loadingspinner from './components/Loadingspinner';
let persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={Loadingspinner} persistor={persistor}>
        <App />
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);
