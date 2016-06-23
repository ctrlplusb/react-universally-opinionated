# WIP WIP WIP

This is very much work in progress.  You can have a look if you like, I am trying to list the features in the README as I add them (see below).  I wouldn't try and use this as a base project though, its still far from where it needs to be.  Once its ready this message will disappear.

---

<p align='center'>
  <h1 align='center'>React, Universally (Opinionated)</h1>
  <p align='center'><img width='150' src='https://raw.githubusercontent.com/ctrlplusb/assets/master/logos/react-universally.png' /></p>
  <p align='center'>A highly opinionated expansion of the <a href="https://github.com/ctrlplusb/react-universally">React, Universally</a> boilerplate.</p>
</p>

## TOC

 - [About](https://github.com/ctrlplusb/react-universally#about)
 - [Features](https://github.com/ctrlplusb/react-universally#features)
 - [Overview](https://github.com/ctrlplusb/react-universally#overview)
 - [Project Structure](https://github.com/ctrlplusb/react-universally#project-structure)
 - [npm script commands](https://github.com/ctrlplusb/react-universally#npm-script-commands)
 - [References](https://github.com/ctrlplusb/react-universally#references)

## About

This boilerplate contains an opinionated set of features and dependencies on top of the super minimal [React, Universally](https://github.com/ctrlplusb/react-universally) boilerplate.  Use this as a repository to fish out further ideas for your own implementation - I highly recommend you use the [React, Universally](https://github.com/ctrlplusb/react-universally) boilerplate as your project starting point rather than this version.

## Features

  - Node V6
  - `express` web server.
  - `react` as the view.
  - `react-router` as the router, with an asynchronous routing configuration.
  - `redux`, `react-redux` and `redux-observable` for uni-directional application state management. ___WIP___
  - `redial` to manage data fetching pre-render for the server. ___WIP___
  - `rethinkdb` as the database. ___WIP___
  - `rethinkdbdash` as our `rethinkdb` client. ___WIP___
  - `socket.io` for our websocket layer. ___WIP___
  - `lodash` as our utility library along with the babel/webpack optimisations. __WIP__
  - `rxjs` v5 as our streaming library.
  - Facebook's flow for static type checking.
  - Server side rendering.
  - Full ES2015 support via babel where needed.
  - Bundling of both client and server using `webpack`.
  - A development and optimised production webpack configuration.
  - Client bundle is split by routes as well as by vendor modules.
  - Tree-shaking for smaller build output. 
  - Live development - i.e. hot reloading of both client and server source.
  - Application configuration via environment file.
  - Redux Dev Tools Extension auto integration for development.
  - Unit testing support via `mocha`, `enzyme`, `chai` and `sinon`. ___WIP___

## Overview

This boilerplate uses Webpack 2 to produce bundles for both the client and the
server code.  You will notice two Webpack configuration files that allow you to target the respective environments:

   - `webpack.client.config.js`
   - `webpack.server.config.js`

Both of these then call into the `webpackConfigFactory.js` in order to generate their respective webpack configurations.  I've tried to keep the webpack configuration as centralized and well documented as possible as it can be a confusing topic at times.

My reasoning for using webpack to bundle both the client and the server is to bring greater interop and extensibility to the table.  This will for instance allowing server bundles to handle React components that introduce things like CSS or Images (as and when you add the respective loaders).

Given that we are bundling our server code I have included the `source-map-support` module to ensure that we get nice stack traces when executing our code via node.

All the source code is written in ES2015, and I have explicitly kept it to the true specification (bar JSX syntax).  As we are following this approach it is unnecessary for us to transpile our source code for the server into ES5, as `node` v6 has native support for almost all of the ES2015 syntax.  Our client (browser) bundle is however transpiled to ES5 code for maximum browser/device support.

The application configuration is supported by the `dotenv` module and it requires you to create a `.env` file in the project root (you can use the `.env_example` as a base).  The `.env` file has been explicitly ignored from git as it will typically contain environment sensitive/specific information.  In the usual case your continuous deployment tool of choice should configure the specific `.env` file that is needed for a target environment.

## Configuring your System

__TODO:__ Details on horizon/rethinkdb install and configuration.

## Project Structure

```
/
|- build // The target output dir for our build commands.
|  |- client // The built client module.
|  |- server // The built server module
|
|- src  // All the source code
|  |- server // The server specific source
|  |- client // The client specific source
|  |- shared // The shared code between the client/server
|
|- .env_example // An example from which to create your own .env file.  
|- devServer.js // Creates a hot reloading development environment
|- webpack.client.config.js // Client target webpack configuration
|- webpack.server.config.js // Server target webpack configuration
|- webpackConfigFactory.js  // Webpack configuration builder
```  

## npm script commands##

### `npm run development`

Starts a development server for both the client and server bundles.  We use `react-hot-loader` v3 to power the hot reloading of the client bundle, whilst a filesystem watch is implemented to reload the server bundle when any changes have occurred.

### `npm run build`

Builds the client and server bundles, with the output being production optimized.

### `npm run start`

Executes the server.  It expects you to have already built the bundles either via the `npm run build` command or manually.

### `npm run clean`

Deletes any build output that would have originated from the other commands.

## Troubleshooting ##

___Q:___ __I see `react-router` warnings during hot reloading.__

For example:

```
Warning: [react-router] You cannot change <Router history>;
Warning: [react-router] You cannot change <Router routes>;
``` 

Fret not! This is a known issue when using React Hot Loader 3 alongside React Router.  It is being looked in to.  Everything still works, unfortunately you just get a few warnings alongside your changes.  They are harmless though, promise. :)

## References ##

  - __Horizon__ - http://horizon.io/
  - __Webpack 2__ - https://gist.github.com/sokra/27b24881210b56bbaff7
  - __React Hot Loader v3__ - https://github.com/gaearon/react-hot-boilerplate/pull/61
  - __dotenv__ - https://github.com/bkeepers/dotenv
