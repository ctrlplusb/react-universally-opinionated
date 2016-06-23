import React from 'react';

export type ReactElement = React.Element;

export type ReactNode = string | number | ReactElement | Array<ReactElement>;

export type ReactChild = ReactNode | boolean | void | null;

export type ReactChildren = ReactChild | Array<ReactChildren>;
