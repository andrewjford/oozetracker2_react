import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import categoriesPageReducer from "./reducers/categoriesReducer";
import expensesReducer from "./reducers/expensesReducer";
import accountReducer from "./reducers/accountReducer";
import revenuesReducer from "./reducers/revenuesReducer";
import { setTokenFromLocalStorage } from "./actions/accountActions";

const rootReducer = combineReducers({
  expenses: expensesReducer,
  categories: categoriesPageReducer,
  account: accountReducer,
  revenues: revenuesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const tokenExpiryDate = localStorage.getItem("expiryDate");
if (tokenExpiryDate && Date.now() < new Date(tokenExpiryDate)) {
  const token = localStorage.getItem("token");
  if (token) {
    store.dispatch(setTokenFromLocalStorage(token));
  }
}
document.title = "Cash Tracker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
