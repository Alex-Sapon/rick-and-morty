import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api, Character, Episode, EpisodeFilter, Info} from '../../api/api';
import {RootState} from '../../components/app/store';
import {getId} from '../../assets';

const fetchEpisode = createAsyncThunk<Info<Episode[]>, void, { rejectValue: string }>
('episode/fetchEpisodes', async (_, {rejectWithValue, getState}) => {
    const {page, name} = (getState() as RootState).episodesPage.filter;

    try {
        return await api.getEpisode({page, name});
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
})

const fetchEpisodeItem = createAsyncThunk<Episode<Character[]>, string, { rejectValue: string }>
('episode/fetchEpisodeItem', async (id, {rejectWithValue}) => {
    try {
        const result = await api.getEpisodeItem(id);

        if (result.characters.length) {
            const resultId = result.characters.map(characterUrl => getId(characterUrl));

            const charactersRes = await api.getCharactersItem(resultId.join(','));

            const characters = Array.isArray(charactersRes) ? charactersRes : [charactersRes];

            return {...result, characters};
        }

        return {...result, characters: []};
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
})

const episodesSlice = createSlice({
    name: 'episode',
    initialState: {
        filter: {page: 1, name: '', episode: ''},
        data: {
            info: {count: 0, pages: 0, next: null, prev: null},
            results: [],
        },
        episode: {} as Episode<Character[]>,
        isLoading: false,
        error: null,
    } as InitialStateType,
    reducers: {
        changeEpisodeFilter(state, action: PayloadAction<EpisodeFilter>) {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchEpisode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEpisode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchEpisode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload!;
            })
            .addCase(fetchEpisodeItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEpisodeItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.episode = action.payload;
            })
            .addCase(fetchEpisodeItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload!;
            })
    }
})

export const episodesReducer = episodesSlice.reducer;
const {changeEpisodeFilter} = episodesSlice.actions;
export const episodeActions = {fetchEpisode, fetchEpisodeItem, changeEpisodeFilter};

type InitialStateType = {
    filter: EpisodeFilter
    data: Info<Episode[]>
    episode: Episode<Character[]>
    isLoading: boolean
    error: string | null
}

