/* @flow */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reduxObservable } from 'redux-observable';
import reducers from '../reducers';

const isHotDevelopmentClient = process.env.NODE_ENV === 'development' &&
  global.IS_CLIENT === true &&
  module.hot;

function enhancedCreateStore(initialState: ?Object = {}) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    // Middleware store enhancer,
    applyMiddleware(reduxObservable()),
    // Redux Dev Tools store enhancer (https://github.com/zalmoxisus/redux-devtools-extension)
    isHotDevelopmentClient && typeof window.devToolsExtension !== 'undefined'
      // Redux Dev Tools should only be enabled in development mode
      // on the client, and if they are available.
      ? window.devToolsExtension()
      // Else we return a noop.
      : f => f
  );

  if (isHotDevelopmentClient) {
    // Enable Webpack hot module replacement for reducers. This is so that we
    // don't lose all of our current application state.
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(combineReducers(nextRootReducer));
    });
  }

  return store;
}

export default enhancedCreateStore;
