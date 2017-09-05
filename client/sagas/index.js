import { fork } from 'redux-saga/effects';

import test from './test';

export default function* () {
  yield [
    fork(test),
  ];
}
