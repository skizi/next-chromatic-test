import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { ModelError } from 'shared/vendor/okami';
import {
  mountListEventsThunk,
  // mountGetEventThunk,
  // mountGetEventWithEntryThunk,
  // mountOrderEventThunk,
} from './thunks';

interface Event {
  id: string;
  title: string;
  releaseYear: string;
}

export * from './thunks';
export * from './selectors';

export interface EventsState {
  isLoading: boolean;
  entities: { [key: string]: Event };
  error?: Error | ModelError | SerializedError;
}

const initialState: EventsState = {
  entities: {},
  isLoading: false,
};

const EventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    mountListEventsThunk(builder);
    // mountGetEventThunk(builder);
    // mountGetEventWithEntryThunk(builder);
    // mountOrderEventThunk(builder);
  },
});

export default EventsSlice.reducer;
