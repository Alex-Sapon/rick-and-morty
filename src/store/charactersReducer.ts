import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api, Character, CharacterFilter, Info} from '../api/api';
import {RootState} from '../components/app/store';

const fetchCharacters = createAsyncThunk<Info<Character[]>, void, { rejectValue: string }>
('characters/fetchCharacters', async (_, {rejectWithValue, getState}) => {
    const {status, gender, species, page, type, name} = (getState() as RootState).characters.filter;

    try {
        return await api.getCharacters({status, gender, species, page, type, name});
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
})

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        filter: {
            page: 1,
            type: '',
            species: '',
            gender: '',
            status: '',
            name: '',
        } as CharacterFilter,
        isLoading: false,
        error: '',
        info: {
            count: 0,
            next: '',
            pages: 0,
            prev: ''
        },
        results: [] as Character[]
    },
    reducers: {
        changeFilter(state, action: PayloadAction<CharacterFilter>) {
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
                state.info.count = action.payload.info?.count!;
                state.info.next = action.payload.info?.next!;
                state.info.prev = action.payload.info?.prev!;
                state.results = action.payload.results;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload!;
            })
    }
})

export const charactersReducer = charactersSlice.reducer;
const {changeFilter} = charactersSlice.actions;
export const charactersActions = {fetchCharacters, changeFilter};
