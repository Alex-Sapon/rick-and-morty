import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Character, Episode, EpisodeFilter, Info, rmAPI} from '../../../api';
import {RootState} from '../../../components/app/store';
import {getErrorMessage, getId, isError, isPending} from '../../../assets';

export const fetchEpisode = createAsyncThunk<Info<Episode[]>, void, { rejectValue: string, state: RootState }>
('episode/fetchEpisodes', async (_, {rejectWithValue, getState}) => {
    const {page, name} = getState().episodesPage.filter;

    try {
        return await rmAPI.getEpisode({page, name});
    } catch (e) {
        return rejectWithValue(getErrorMessage(e));
    }
})

export const fetchEpisodeItem = createAsyncThunk<Episode<Character[]>, string, { rejectValue: string }>
('episode/fetchEpisodeItem', async (id, {rejectWithValue}) => {
    try {
        const result = await rmAPI.getEpisodeItem(id);

        if (result.characters.length) {
            const resultId = result.characters.map(characterUrl => getId(characterUrl));

            const charactersRes = await rmAPI.getCharactersItem(resultId.join(','));

            const characters = Array.isArray(charactersRes) ? charactersRes : [charactersRes];

            return {...result, characters};
        }

        return {...result, characters: []};
    } catch (e) {
        return rejectWithValue(getErrorMessage(e));
    }
})

const initialState: InitialStateType = {
    filter: {page: 1, name: '', episode: ''},
    data: {
        info: {count: 0, pages: 0, next: null, prev: null},
        results: [],
    },
    episode: {} as Episode<Character[]>,
    isLoading: false,
    error: null,
}

export const episodesSlice = createSlice({
    name: 'episode',
    initialState,
    reducers: {
        changeEpisodeFilter(state, action: PayloadAction<EpisodeFilter>) {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchEpisode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchEpisodeItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.episode = action.payload;
            })
            .addMatcher(isPending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const {changeEpisodeFilter} = episodesSlice.actions;
export const episodeActions = {fetchEpisode, fetchEpisodeItem, changeEpisodeFilter};

export type InitialStateType = {
    filter: EpisodeFilter
    data: Info<Episode[]>
    episode: Episode<Character[]>
    isLoading: boolean
    error: string | null
}

