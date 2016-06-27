import React from 'react';

declare module 'react-router' {
  declare interface MatchOptions {
    history?: Object, // $npm$history$History,
    location?: string,
    routes: React$Element
  }

  declare type MatchCallback = (err: ?Object, nextLocation: $npm$history$Location, routerProps: Object) => any;

  declare interface ReactRouter extends React.Component<*, *, *> {
    browserHistory: $npm$history$History,
    hashHistory: $npm$history$History,
    createMemoryHistory: $npm$history$CreateHistory,

    IndexRedirect: React.Component<*, *, *>;
    IndexRoute: React.Component<*, *, *>;
    Link: React.Component<*, *, *>;
    Redirect: React.Component<*, *, *>;
    Route: React.Component<*, *, *>;
    Router: React.Component<*, *, *>;
    RouterContext: React.Component<*, *, *>;

    createRoutes: (routes: React$Element<*>) => Array<Object>;
    formatPattern: (pattern: string, params: Object) => string;
    match: (options: MatchOptions, callback: MatchCallback) => void;
    useRouterHistory: (historyFactory: Function) => (options: ?Object) => Object;
  }

  declare var exports: ReactRouter;
}
