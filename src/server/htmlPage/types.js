import React from 'react';

export type Assets = {
  css: Array<string>,
  javascript: Array<string>
};

export type PageData = {
  title: ?string,
  meta: { [key: string]: number },
  initialState: ?Object,
  reactElement: ?React.Element
};
