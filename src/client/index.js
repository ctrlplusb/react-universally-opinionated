import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import createStore from '../shared/redux/createStore'
import routes from '../shared/routes'
import horizonClient from '../shared/horizon/client'

// Get the DOM Element that will host our React application.
const container = document.getElementById('app')

// Create our Redux store.
const store = createStore(
  // Server side rendering would have mounted our state on this global.
  window.APP_STATE
)

function renderApp () {
  render(
    <AppContainer>
      <Provider store={store}>
        {/*
        We need to explicly render the Router component here instead of have
        this embedded within a shared App type of component as we use different
        router base components for client vs server rendering.
        */}
        <Router routes={routes} history={browserHistory} />
      </Provider>
    </AppContainer>,
    container
  )
}

// The following is needed so that we can hot reload our App.
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../shared/routes', renderApp)
}

renderApp()
