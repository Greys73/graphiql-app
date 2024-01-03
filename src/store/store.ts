import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import documentationReducer from './reducers/DocumentationSlice';
import APISlice from './reducers/APISlice';

export const rootReducer = combineReducers({
  documentationReducer: documentationReducer,
  APIReducer: APISlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
