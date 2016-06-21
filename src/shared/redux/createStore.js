import { createStore, combineReducers } from 'redux'
import reducers from '../reducers'

const isHotDevelopmentClient = process.env.NODE_ENV === 'development' &&
  global.IS_CLIENT === true &&
  module.hot

function enhancedCreateStore (initialState = {}) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    // Redux Dev Tools Enhancer (https://github.com/zalmoxisus/redux-devtools-extension)
    isHotDevelopmentClient && typeof window.devToolsExtension !== 'undefined'
      // Redux Dev Tools should only be enabled in development mode
      // on the client, and if they are available.
      ? window.devToolsExtension()
      // Else we return a noop.
      : f => f
  )

  if (isHotDevelopmentClient) {
    // Enable Webpack hot module replacement for reducers. This is so that we
    // don't lose all of our current application state.
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default enhancedCreateStore