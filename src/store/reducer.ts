import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, CharacterFilter} from '../api/api';

const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async (_, {}) => {
    try {
        const res = await api.getCharacters({});
        console.log(res)
    } catch (e) {

    }
})

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        params: {} as CharacterFilter
    },
    reducers: {},
    extraReducers: builder => {

    }
})

export const charactersAsyncActions = {fetchCharacters};
export const charactersReducer = charactersSlice.reducer;