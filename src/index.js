import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import App from "./App";
import rootReducer from './modules';

const logger = createLogger();

const store = configureStore({
  reducer : rootReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);
