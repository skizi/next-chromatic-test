import { AppState } from '..';
import { EventsState } from '.';
import { ModelError } from 'shared/vendor/okami';
import { SerializedError } from '@reduxjs/toolkit';
import { Event } from '~/store/utils/cc-web-api';

export const stateSelector = (state: AppState): EventsState => state.events;
// export const errorSelector = (
//   state: AppState
// ): Error | ModelError | SerializedError | undefined => state.events.error;
export const eventsSelector = (state: AppState): { [key: string]: Event } =>
  state.events.entities;
export const eventSelector =
  (id: string) =>
  (state: AppState): Event | undefined =>
    state.events.entities[id];
// export const isLoadingSelector = (state: AppState): boolean =>
//   state.events.isLoading;
