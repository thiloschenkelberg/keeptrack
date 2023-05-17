
import { configureStore } from '@reduxjs/toolkit';


// export default function configureStore(preloadedState: any) {
//   const middlewares = [ReduxThunk];
//   const middlewareEnhancer = applyMiddleware(...middlewares);

//   const enhancer = composeWithDevTools(middlewareEnhancer);

//   const store = createStore(reducer, preloadedState, enhancer);
//   return store;
// }

export default function createStore(initalState: any) {
  const store = configureStore({
    reducer: {},
    preloadedState: initialAppState,
  });
  return store;
}



export interface AppState {}

export const initialAppState: AppState = {};

export const store = createStore(initialAppState);