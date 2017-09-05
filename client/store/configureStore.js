/* eslint no-console: 0 */
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import CreateSagaMiddleware from 'redux-saga';
import DevTools from './DevTools';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default (initialState) => {
  const sagaMiddleware = CreateSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        createLogger(),
      ),
      DevTools.instrument(),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
