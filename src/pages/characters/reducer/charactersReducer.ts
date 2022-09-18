import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character, CharacterFilter, Episode, Info, rmAPI} from '../../../api';
import {RootState} from '../../../components/app/store';
import {getId, isError} from '../../../assets';

const fetchCharacters = createAsyncThunk<Info<Character[]>, void, { rejectValue: string }>
('characters/fetchCharacters', async (_, {rejectWithValue, getState}) => {
    const {status, gender, species, page, type, name} = (getState() as RootState).charactersPage.filter;

    try {
        return await rmAPI.getCharacters({status, gender, species, page, type, name});
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
})

const fetchCharactersItem = createAsyncThunk<Character<Episode[]>, string, { rejectValue: string }>
('characters/fetchCharactersItem', async (id, {rejectWithValue}) => {
    try {
        const result = await rmAPI.getCharactersItem(id);

        if (result.episode.length) {
            const resultsId = result.episode.map(episodeUrl => getId(episodeUrl));

            const episodeRes = await rmAPI.getEpisodeItem(resultsId.join(','))

            const episode = Array.isArray(episodeRes) ? episodeRes : [episodeRes];

            return {...result, episode};
        }

       return {...result, episode: []};
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
        error: null,
        character: {} as Character<Episode[]>,
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
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchCharactersItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCharactersItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.character = action.payload;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
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
    error: string | null
    data: Info<Character[]>
    character: Character<Episode[]>
}