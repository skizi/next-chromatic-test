import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AppThunkApi } from '..';
import { EventsState, Event } from '.';
// import { normalizeError } from 'shared/lib/error/handle-error';
// import { getEventApi, Event, getOrderApi } from '~/store/utils/cc-web-api';
// import { Order } from 'shared/vendor/cc-web-api';
import axios from 'axios';

export const listEvents = createAsyncThunk<Event[], void, AppThunkApi>(
  'events/list',
  async (_, thunkApi) => {
    try {
      const response = await axios.get('https://reactnative.dev/movies.json');
      return response.data.movies;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const mountListEventsThunk = (
  builder: ActionReducerMapBuilder<EventsState>
): void => {
  builder.addCase(listEvents.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(listEvents.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    payload.forEach((item) => {
      state.entities[item.id] = item as Event;
    });
  });
  builder.addCase(listEvents.rejected, (state, action) => {
    state.isLoading = false;
    if (action.payload) {
      state.error = action.payload;
    } else {
      state.error = action.error;
    }
  });
};
/*
export const getEvent = createAsyncThunk<CCWebApiEvent, string, AppThunkApi>(
  'events/get',
  async (id, thunkApi) => {
    const api = await getEventApi();
    try {
      const response = await api.getEvent(id);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(normalizeError(error));
    }
  }
);

export const mountGetEventThunk = (
  builder: ActionReducerMapBuilder<EventsState>
): void => {
  builder.addCase(getEvent.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getEvent.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.entities[payload.id] = payload as Event;
  });
  builder.addCase(getEvent.rejected, (state, action) => {
    state.isLoading = false;
    if (action.payload) {
      state.error = action.payload;
    } else {
      state.error = action.error;
    }
  });
};

export const getEventWithEntry = createAsyncThunk<
  { id: string; entry: EventEntry },
  string,
  AppThunkApi
>('events/entry', async (id, thunkApi) => {
  const api = await getEventApi(thunkApi.extra.getAuth0Context());
  try {
    await thunkApi.dispatch(getEvent(id));
    const response = await api.getEventEntry(id);
    return { entry: response.data, id };
  } catch (error) {
    return thunkApi.rejectWithValue(normalizeError(error));
  }
});

export const mountGetEventWithEntryThunk = (
  builder: ActionReducerMapBuilder<EventsState>
): void => {
  builder.addCase(getEventWithEntry.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getEventWithEntry.fulfilled, (state, { payload }) => {
    state.isLoading = false;
    state.entities[payload.id].entry = payload.entry;
  });
  builder.addCase(getEventWithEntry.rejected, (state, action) => {
    state.isLoading = false;
    if (action.payload) {
      state.error = action.payload;
    } else {
      state.error = action.error;
    }
  });
};

export const orderEvent = createAsyncThunk<Order, string, AppThunkApi>(
  'events/order',
  async (product_id, thunkApi) => {
    const api = await getOrderApi(thunkApi.extra.getAuth0Context());
    try {
      const response = await api.createOrder({ product_id });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(normalizeError(error));
    }
  }
);

export const mountOrderEventThunk = (
  builder: ActionReducerMapBuilder<EventsState>
): void => {
  builder.addCase(orderEvent.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(orderEvent.fulfilled, (state) => {
    state.isLoading = false;
  });
  builder.addCase(orderEvent.rejected, (state, action) => {
    state.isLoading = false;
    if (action.payload) {
      state.error = action.payload;
    } else {
      state.error = action.error;
    }
  });
};
*/
