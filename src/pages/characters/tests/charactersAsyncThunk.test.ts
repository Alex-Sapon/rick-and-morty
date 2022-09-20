import {
    fetchCharacters,
    fetchCharactersItem,
    changeCharactersFilter,
    InitialStateType,
    charactersSlice
} from '../reducer/charactersReducer';
import {Character, Info} from '../../../api';

global.fetch = jest.fn();

let initialState: InitialStateType;

beforeEach(() => {
    initialState = {
        filter: {page: 1, name: '', type: '', gender: '', species: '', status: ''},
        data: {
            info: {count: 1, next: null, prev: null, pages: 1},
            results: []
        },
        error: null,
        isLoading: false,
        character: {
            id: 1,
            name: '',
            type: '',
            gender: 'Female',
            created: '',
            episode: [],
            image: '',
            status: 'Alive',
            species: '',
            url: '',
            location: {name: '', url: ''},
            origin: {name: '', url: ''}
        }
    }
})

// describe('charactersThunk', () => {
//     it('should fetchCharacters with resolved response', async () => {
//         const mockState: Info<Character[]> = {
//             info: {count: 1, next: null, prev: null, pages: 1},
//             results: []
//         };
//
//         (<jest.Mock>fetch).mockResolvedValue({
//             ok: true,
//             json: () => Promise.resolve(mockState)
//         });
//
//         getState = jest.fn();
//
//         const dispatch = jest.fn();
//         const thunk = fetchCharacters();
//
//         await thunk(dispatch, getState, {});
//
//         const {calls} = dispatch.mock;
//         expect(calls).toHaveLength(2);
//
//         const [start, end] = calls;
//         console.log(dispatch.mock.calls)
//
//         expect(start[0].type).toBe(fetchCharacters.pending.type);
//         expect(end[0].type).toBe(fetchCharacters.fulfilled.type);
//         expect(end[0].payload).toBe(mockState);
//     })
//
//     it('should fetchCharacters with rejected response', async () => {
//         (<jest.Mock>fetch).mockResolvedValue({
//             ok: false,
//             json: () => Promise.resolve(mockState)
//         });
//
//         getState = jest.fn();
//
//         const dispatch = jest.fn();
//         const thunk = fetchCharacters();
//
//         await thunk(dispatch, getState, {});
//
//         const {calls} = dispatch.mock;
//         expect(calls).toHaveLength(2);
//
//         const [start, end] = calls;
//
//         console.log(end)
//
//         expect(start[0].type).toBe(fetchCharacters.pending.type);
//         expect(end[0].type).toBe(fetchCharacters.rejected.type);
//     })
// })

describe('charactersSlice', () => {
    it('should change status with "fetchCharacters.pending" action', () => {
        const state = charactersSlice.reducer(initialState, fetchCharacters.pending);

        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    })

    it('should change status with "fetchCharacters.fulfilled" action', () => {
        const payload: Info<Character[]> = {
            results: [
                {
                    id: 1,
                    name: 'Rick Sanchez',
                    status: 'Alive',
                    species: 'Human',
                    type: '',
                    gender: 'Male',
                    origin: {name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1'},
                    location: {name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3'},
                    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                    episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
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
        };

        const state = charactersSlice.reducer(initialState, fetchCharacters.fulfilled(payload, ''));

        expect(state).toEqual({
            filter: initialState.filter,
            data: {
                results: payload.results,
                info: payload.info
            },
            character: initialState.character,
            error: null,
            isLoading: false,
        })
    })

    it('should change status with "fetchCharacters.rejected" action', () => {
        const error = 'Can\'t fetch data';

        const state = charactersSlice.reducer(initialState, fetchCharacters.rejected(null, error, undefined, error));

        expect(state.error).toBe('Can\'t fetch data');
    })
})