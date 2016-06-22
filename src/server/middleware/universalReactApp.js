/* @flow */

import React from 'react';
import { Provider } from 'react-redux';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import createStore from '../../shared/redux/createStore';
import routes from '../../shared/routes';
import render from '../htmlPage/render';

/**
 * An express middleware that is capabable of doing React server side rendering.
 */
function universalReactAppMiddleware(request, response) {
  if (process.env.DISABLE_SSR) {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> 🐌  Handling react route without SSR'); // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to populate the initial react application state.
    const html = render();
    response.status(200).send(html);
    return;
  }

  // Create the redux store.
  const store = createStore();

  // This in-memory version of history will play nicely with our SSR.
  const history = createMemoryHistory(request.originalUrl);

  // Server side handling of react-router.
  // Read more about this here:
  // https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.

      const reactApp = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const html = render({ rootElement: reactApp });
      response.status(200).send(html);
    } else {
      response.status(404).send('Not found');
    }
  });
}

export default universalReactAppMiddleware;
