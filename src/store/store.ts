import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {charactersSlice} from './charactersReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    characters: charactersSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;