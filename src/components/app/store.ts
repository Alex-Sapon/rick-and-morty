import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {charactersSlice} from '../../pages/characters';
import {locationsSlice} from '../../pages/locations';
import {episodesSlice} from '../../pages/episodes';

export const store = configureStore({
    reducer: {
        charactersPage: charactersSlice.reducer,
        locationsPage: locationsSlice.reducer,
        episodesPage: episodesSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;

