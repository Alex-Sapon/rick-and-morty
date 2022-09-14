import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api, Character, CharacterFilter, Info} from '../../api/api';
import {RootState} from '../app/store';

const fetchCharacters = createAsyncThunk<Info<Character[]>, void, { rejectValue: string }>
('characters/fetchCharacters', async (_, {rejectWithValue, getState}) => {
    const {status, gender, species, page, type, name} = (getState() as RootState).charactersPage.filter;

    try {
        return await api.getCharacters({status, gender, species, page, type, name});
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
})

const fetchCharactersItem = createAsyncThunk<Character, { id: number }, { rejectValue: string }>
('characters/fetchCharactersItem', async ({id}, {rejectWithValue}) => {
    try {
        return await api.getCharactersItem(id);
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
})

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        filter: {page: 1, type: '', species: '', gender: '', status: '', name: ''},
        data: {
            info: {count: 0, next: '', pages: 0, prev: ''},
            results: [],
        },
        isLoading: false,
        error: '',
        character: {} as Character,
    } as InitialStateType,
    reducers: {
        changeCharactersFilter(state, action: PayloadAction<CharacterFilter>) {
            state.filter = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload!;
            })
            .addCase(fetchCharactersItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCharactersItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.character = action.payload;
            })
            .addCase(fetchCharactersItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload!;
            })
    }
})

export const charactersReducer = charactersSlice.reducer;
const {changeCharactersFilter} = charactersSlice.actions;
export const charactersActions = {fetchCharacters, changeCharactersFilter, fetchCharactersItem};

type InitialStateType = {
    filter: CharacterFilter
    isLoading: boolean
    error: string
    data: Info<Character[]>
    character: Character
}