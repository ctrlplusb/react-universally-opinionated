/* @flow */
/* eslint-disable no-console */

import initIO from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import type { Observable as ObservableType } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

const serverAddr = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

type DataEvent = {
  type: string,
  payload: ?any
};

function getServerDataStream(collectionName) {
  const socket = initIO(serverAddr.concat(`/data/${collectionName}`)).connect();

  const fromSocketEvent = eventName => Observable.fromEvent(socket, eventName);

  const collection$ : ObservableType<DataEvent> = Observable.merge(
    fromSocketEvent('connect').map(() => ({ type: 'connect' })),
    fromSocketEvent('disconnect').map(() => ({ type: 'disconnect' })),
    fromSocketEvent('data').map(data => ({ type: 'data', payload: data }))
  );

  collection$.subscribe(({ type }) => console.log(type));

  return collection$;
}

const dataStreams = {
  todos$: getServerDataStream('todos'),
};

export default dataStreams;
