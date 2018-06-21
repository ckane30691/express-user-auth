import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root.jsx';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  let user = document.getElementsByClassName('currentUser')[0].innerHTML;
  let userDiv = document.getElementsByClassName('currentUser')[0];

  if (user !== null && user !== 'null') {
    const preloadedState = { session: { currentUser: user } };
    store = configureStore(preloadedState);
    userDiv.parentNode.removeChild(userDiv);

  } else {
    store = configureStore();
  }
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});
