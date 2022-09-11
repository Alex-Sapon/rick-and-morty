import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;

