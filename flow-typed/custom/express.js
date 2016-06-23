// @flow

declare module 'express' {
    declare type RouterOptions = {
      caseSensitive?: boolean,
      mergeParams?: boolean,
      strict?: boolean
    };
    declare class RequestResponseBase {
        app: Application;
        get(field: string): string | void;
    }
    declare class Request extends http$IncomingMessage mixins RequestResponseBase {
      baseUrl: string;
      body: any;
      cookies: { [cookie: string]: string },
      fresh: boolean;
      hostname: boolean;
      ip: string;
      ips: Array<string>,
      method: string,
      originalUrl: string;
      params: { [param: string]: string },
      path: string,
      protocol: 'https' | 'http',
      query: { [name: string]: string },
      route: string,
      secure: boolean,
      signedCookies: { [signedCookie: string]: string },
      stale: boolean;
      subdomains: Array<string>;
      xhr: boolean;
      accepts(types: string): string | false;
      acceptsCharsets(...charsets: Array<string>): string | false;
      acceptsEncodings(...encoding: Array<string>): string | false;
      acceptsLanguages(...lang: Array<string>): string | false;
      header(field: string): string | void;
      is(type: string): boolean;
      param(name: string, defaultValue?: string): string | void;
    }


    declare type CookieOptions = {
        domain?: string,
        encode?: (value: string) => string,
        expires?: Date,
        httpOnly?: boolean,
        maxAge?: string,
        path?: string,
        secure?: boolean,
        signed?: boolean
    };

    declare type SendFileOptions = {
        maxAge?: number,
        root?: string,
        lastModified?: boolean,
        headers?: { [name: string]: string },
        dotfiles?: 'allow' | 'deny' | 'ignore'
    };
    declare class Response extends http$ClientRequest mixins RequestResponseBase {
        headersSent: boolean;
        locals: any;
        append(field: string, value?: string): Response;
        attachment(filename?: string): Response;
        cookie(name: string, value: string, options?: CookieOptions): Response;
        clearCookie(name: string, options?: CookieOptions): Response;
        download(path: string, filename?: string, callback?: (err?: ?Error) => void): Response;
        format(typesObject: {[type: string]: Function}): Response;
        json(body?: any): Response;
        jsonp(body?: any): Response;
        links(links: {[name: string]: string}): Response;
        location(path: string): Response;
        redirect(status?: number, path: string): Response;
        render(view: string, locals?: any, callback: (err?: ?Error) => any): Response;
        send(body?: any): Response;
        sendFile(path: string, options?: SendFileOptions, callback?: (err?: ?Error) => any): Response;
        sendStatus(statusCode: number): Response;
        set(field: string, value?: string): Response  ;
        status(statusCode: number): Response;
        type(type: string): Response;
        vary(field: string): Response;
    }
    declare type $Response = Response;
    declare type $Request = Request;
    declare type NextFunction = (err?: ?Error) => any;
    declare type Middleware =
        (req: Request, res: Response, next: NextFunction) => any |
        (error: ?Error, req: Request, res: Response, next: NextFunction) => any;
    declare class Router {
      constructor(options?: RouterOptions): void;

      use(middleware: Middleware): void;
      use(...middelware: Array<Middleware>): void;
      use(path: string, ...middelware: Array<Middleware>): void;

      get(middleware: Middleware): void;
      get(...middelware: Array<Middleware>): void;
      get(path: string, ...middelware: Array<Middleware>): void;

      post(middleware: Middleware): void;
      post(...middelware: Array<Middleware>): void;
      post(path: string, ...middelware: Array<Middleware>): void;

      put(middleware: Middleware): void;
      put(...middelware: Array<Middleware>): void;
      put(path: string, ...middelware: Array<Middleware>): void;

      delete(middleware: Middleware): void;
      delete(...middelware: Array<Middleware>): void;
      delete(path: string, ...middelware: Array<Middleware>): void;
    }

    declare function serveStatic(root: string, options?: Object): Middleware;

    declare class Application extends Router mixins events$EventEmitter {
      constructor(): void;
      locals: {[name: string]: any};
      mountpath: string;

      disable(name: string): void;
    }
    declare type $Application = Application;

    declare module.exports: {
        (): Application, // If you try to call like a function, it will use this signature
        static: serveStatic, // `static` property on the function
        Router: typeof Router, // `Router` property on the function
    };
}
