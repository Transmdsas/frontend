import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { vehiclesReducers, uiReducers, ParametersReducers, driversReducers } from "../reducers";

const reducers = combineReducers({
  vehiclesReducers,
  ParametersReducers,
  uiReducers,
  driversReducers
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
