import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import App from "./App";
import rootReducer, { rootSaga } from './modules';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer : rootReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(ReduxThunk).concat(sagaMiddleware),
  devTools : composeWithDevTools()
});
sagaMiddleware.run(rootSaga);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);
