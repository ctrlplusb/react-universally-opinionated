type WebpackHot = {
  accept(path: ?string) : void;
}

declare var module: {
    exports: any;
    require(id: string): any;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: Array<any>;
    hot: WebpackHot
};
