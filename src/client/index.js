import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Router, browserHistory, match } from 'react-router'
import createStore from '../shared/redux/createStore'
import routes from '../shared/routes'
import initSocket from './socket/init'

// Get the DOM Element that will host our React application.
const container = document.getElementById('app')

// Create our Redux store.
const store = createStore(
  // Server side rendering would have mounted our state on this global.
  window.APP_STATE
)

// Init our web socket.
initSocket()

function renderApp () {
  // As we are using dynamic react-router routes we have to use the following
  // asynchronous routing mechanism supported by the `match` function.
  // @see https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      // TODO: Error handling.
      console.log('==> 😭  React Router match failed.')
    }

    render(
      <AppContainer>
        <Provider store={store}>
          {/*
          We need to explicly render the Router component here instead of have
          this embedded within a shared App type of component as we use different
          router base components for client vs server rendering.
          */}
          <Router {...renderProps} />
        </Provider>
      </AppContainer>,
      container
    )
  })
}

// The following is needed so that we can hot reload our App.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept()
  // Any changes to our routes will cause a hotload re-render.
  module.hot.accept('../shared/routes', renderApp)
}

renderApp()
