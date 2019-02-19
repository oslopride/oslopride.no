import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable */
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/* eslint-enable */

export default initialState => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  return store;
};
