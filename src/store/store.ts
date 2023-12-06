import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
// import someSlice from './reducers/someSlice';

export const rootReducer = combineReducers({
  // somedata: someSlice,
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
