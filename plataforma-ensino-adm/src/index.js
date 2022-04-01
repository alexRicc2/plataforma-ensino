import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bootstrap.css';

// import './assets/css/index.css';
// import './assets/css/skeleton.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={createStore(reducers, {},applyMiddleware(ReduxThunk))}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
