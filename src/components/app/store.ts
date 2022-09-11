import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {charactersReducer} from '../../store/charactersReducer';

const rootReducer = combineReducers({
    characters: charactersReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
