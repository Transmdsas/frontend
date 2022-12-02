import { configureStore } from '@reduxjs/toolkit';
import parameterReducer from './parameters/parameterSlice';
import valueReducer from './values/valueSlice';

export const store = configureStore({
  reducer: {
    parameters: parameterReducer,
    values: valueReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch