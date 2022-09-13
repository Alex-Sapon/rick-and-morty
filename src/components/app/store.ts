import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {charactersReducer} from '../characters/charactersReducer';
import {locationsReducer} from '../locations/locationsReducer';

const rootReducer = combineReducers({
    charactersPage: charactersReducer,
    locationsPage: locationsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;

