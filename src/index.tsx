import React from 'react';
import {render} from 'react-dom';
import App from 'components/app/app';
import {createAPI} from './services/api';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {rootReducer} from './store/root-reducer';
import {fetchQuestsAction} from './store/api-actions';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(fetchQuestsAction());

render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
