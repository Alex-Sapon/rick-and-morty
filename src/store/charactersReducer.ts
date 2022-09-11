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
            next: null,
            pages: 0,
            prev: null
        },
        results: [] as Character[]
    },
    reducers: {
        changeGender(state, action: PayloadAction<{ gender: string }>) {
            state.filter.gender = action.payload.gender;
        },
        changeName(state, action: PayloadAction<{ name: string }>) {
            state.filter.name = action.payload.name;
        },
        changeSpecies(state, action: PayloadAction<{ species: string }>) {
            state.filter.species = action.payload.species;
        },
        changeStatus(state, action: PayloadAction<{ status: string }>) {
            state.filter.status = action.payload.status;
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
                state.results = action.payload.results;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload!;
            })
    }
})

export const charactersReducer = charactersSlice.reducer;
const {changeGender, changeName, changeSpecies, changeStatus} = charactersSlice.actions;
export const charactersAsyncActions = {fetchCharacters, changeGender, changeName, changeSpecies, changeStatus};
