// Flow definition for history@3.0.0

declare type $npm$history$Href = string;
declare type $npm$history$HistoryOptions = Object;
declare type $npm$history$Action = 'PUSH' | 'REPLACE' | 'POP';
declare type $npm$history$LocationPath = string;
declare type $npm$history$LocationKey = string;
declare type $npm$history$LocationSearch = string;
declare type $npm$history$LocationState = Object;
declare type $npm$history$LocationQuery = Object;

declare class $npm$history$Location {
  action: ?$npm$history$Action,
  key: ?$npm$history$LocationKey,
  pathname: $npm$history$LocationPath,
  // Note: This is enabled via the "useQueries" createHistory enhancer.
  query: ?$npm$history$LocationQuery,
  search: $npm$history$LocationSearch,
  state: ?$npm$history$LocationState
}

type $npm$history$LocationDescriptor = $npm$history$Location | $npm$history$LocationPath;
type $npm$history$LocationListener = (location: $npm$history$Location) => void;
type $npm$history$TransitionHook = (location: $npm$history$Location, callback: ?Function) => boolean | string | void;
type $npm$history$BeforeUnloadHook = () => ?string;

declare class $npm$history$History {
  beforeUnloadHook: ?((hook: $npm$history$BeforeUnloadHook) => void);
  canGo: (n: number) => boolean;
  createHref: (location: $npm$history$LocationDescriptor) => $npm$history$Href;
  createKey: () => $npm$history$LocationKey;
  createPath: () => $npm$history$LocationPath;
  getCurrentLocation: () => $npm$history$Location;
  go: (n: number) => void;
  goBack: () => void;
  goForward: () => void;
  listen: (listener: $npm$history$LocationListener) => Function;
  listenBefore: (hook: $npm$history$TransitionHook) => Function;
  push: (location: $npm$history$LocationDescriptor) => void;
  replace: (location: $npm$history$LocationDescriptor) => void;
  transistionTo: (location: $npm$history$Location) => void;
}

declare type $npm$history$CreateHistory = (options: ?$npm$history$HistoryOptions) => $npm$history$History;
declare type $npm$history$CreateHistoryEnhancer = (createHistory: $npm$history$CreateHistory) => $npm$history$CreateHistory;

// Primary module
declare module 'history' {
  declare interface History {
    createHistory: $npm$history$CreateHistory,
    createHashHistory:$npm$history$CreateHistory,
    createMemoryHistory: $npm$history$CreateHistory,
    createLocation: (path: $npm$history$LocationPath, state: ?$npm$history$LocationState) => $npm$history$Location,
    useBeforeUnload: $npm$history$CreateHistoryEnhancer,
    useQueries: $npm$history$CreateHistoryEnhancer,
    useBasename: $npm$history$CreateHistoryEnhancer
  }

  declare var exports: History;
}

// HTML5 history factory module.
declare module 'history/lib/createBrowserHistory' {
  declare var exports: $npm$history$CreateHistory
}

// Hash history factory module.
declare module 'history/lib/createHashHistory' {
  declare var exports: $npm$history$CreateHistory
}

// Memory history factory module.
declare module 'history/lib/createMemoryHistory' {
  declare var exports: $npm$history$CreateHistory
}
