import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import rootSaga from "./saga";
import createSentryMiddleware from "./sentryMiddleware";

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
    composeEnhancers(applyMiddleware(sagaMiddleware, createSentryMiddleware()))
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
