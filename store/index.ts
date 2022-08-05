import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import eventsReducer from './events';
import { IStoreError } from 'shared/lib/error';

const rootReducer = combineReducers({
  events: eventsReducer,
});

const customizedMiddleware = getDefaultMiddleware({
  thunk: {
    extraArgument: {},
  },
  serializableCheck: {
    ignoredActions: [],
  },
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: customizedMiddleware,
  enhancers: [],
});


export default store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export interface AppThunkApi {
  dispatch: AppDispatch;
  state: AppState;
  rejectValue: IStoreError;
  extra: {
    getAuth0Context: () => Auth0ContextInterface | undefined;
  };
}
