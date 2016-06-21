import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../components/App'

function handleError (err) {
  console.log('==> Error occurred loading dynamic route')
  console.log(err)
}

const routes = (
  <Route path='/' component={App}>
    {/* Show the Home component at "/" */}
    <IndexRoute getComponent={(nextState, cb) =>
      System.import('../components/Home').then(module => cb(null, module.default)).catch(handleError)}
    />

    <Route path='about' getComponent={(nextState, cb) =>
      System.import('../components/About').then(module => cb(null, module.default)).catch(handleError)}
    />
  </Route>
)

export default routes
