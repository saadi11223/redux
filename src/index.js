// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import store from './store';
import App from './App';
const theme = createTheme();
ReactDOM.render(
  <Provider store={store}>
  <ThemeProvider theme={theme}>
  </ThemeProvider>,
    <App />
  </Provider>,
  document.getElementById('root')
);
