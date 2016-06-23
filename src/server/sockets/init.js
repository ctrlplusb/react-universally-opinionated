/* @flow */

import bindIO from 'socket.io';
import type { Server } from 'http';

function initSockets(httpServer: Server) {
  const io = bindIO(httpServer);

  // Fire up our socket listeners
  io.of('/todos').on('connection', (socket) => {
    console.log('==> Socket connected'); // eslint-disable-line no-console
    setInterval(() => socket.emit('data', { hello: 'world' }), 2000);
    // socket.on('todos', data => console.log(data))
  });

  return io;
}

export default initSockets;
