import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { vehiclesReducers } from "../reducers/vehiclesReducers";
import { ParametersReducers } from "../reducers/parametersReducers";
import { InputsReducers } from "../reducers/inputsReducer";

const reducers = combineReducers({
  InputsReducers,
  vehiclesReducers,
  ParametersReducers,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
