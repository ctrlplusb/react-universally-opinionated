/* @flow */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import type { ReactNode } from '../../types/react';

function App(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>React, Universally</h1>
        <strong>A strongly opinionated extension of the "React, Universally" boilerplate.</strong>
      </div>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
App.propTypes = {
  children: PropTypes.node,
};

export default App;
