import {
    fetchEpisode,
    fetchEpisodeItem,
    episodesSlice,
    changeEpisodeFilter,
    InitialStateType
} from '../reducer/episodesReducer';
import {Character, Episode, Info} from '../../../api';

let initialState: InitialStateType;

beforeEach(() => {
    initialState = {
        filter: {page: 1, name: '', episode: ''},
        data: {
            info: {count: 0, pages: 0, next: null, prev: null},
            results: [],
        },
        episode: {} as Episode<Character[]>,
        isLoading: false,
        error: null,
    }
})

describe('fetchEpisode', () => {
    it('should change status with "fetchEpisode.pending" action', () => {
        const state = episodesSlice.reducer(initialState, fetchEpisode.pending);

        expect(state.isLoading).toBeTruthy();
    })

    it('should change status with "fetchEpisode.fulfilled" action', () => {
        const payload: Info<Episode[]> = {
            results: [
                {
                    id: 1,
                    name: 'Pilot',
                    air_date: 'December 2, 2013',
                    episode: 'S01E01',
                    characters: [
                        'https://rickandmortyapi.com/api/character/1',
                    ],
                    url: 'https://rickandmortyapi.com/api/character/1',
                    created: '2017-11-04T18:48:46.250Z'
                }
            ],
            info: {
                count: 826,
                pages: 42,
                next: 'https://rickandmortyapi.com/api/character/?page=2',
                prev: null
            }
        }

        const state = episodesSlice.reducer(initialState, fetchEpisode.fulfilled(payload, ''));

        expect(state).toEqual({
            filter: initialState.filter,
            data: {
                results: payload.results,
                info: payload.info
            },
            episode: initialState.episode,
            error: null,
            isLoading: false,
        })
    })

    it('should change status with "fetchEpisode.rejected" action', () => {
        const error = 'Can\'t fetch data';

        const state = episodesSlice.reducer(initialState, fetchEpisode.rejected(null, error, undefined, error));

        expect(state.error).toBe(error);
    })
})
