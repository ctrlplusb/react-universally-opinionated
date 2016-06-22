/* @flow */
/* eslint-disable no-console */

import initIO from 'socket.io-client';

const serverAddr = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/todos`;
let socket;

function init() {
  if (socket) {
    return;
  }

  socket = initIO(serverAddr).connect();
  socket.on('connect', () => console.log('==> Socket connected'));
  socket.on('disconnect', () => console.log('==> Socket disconnected'));
  socket.on('data', data => console.log('Socket data received', data));
}

export default init;
