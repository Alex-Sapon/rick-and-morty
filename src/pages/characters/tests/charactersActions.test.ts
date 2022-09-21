import {
    fetchCharacters,
    fetchCharactersItem,
    changeCharactersFilter,
    InitialStateType,
    charactersSlice
} from '../reducer/charactersReducer';
import {Character, CharacterFilter, Episode, Info} from '../../../api';

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

describe('fetchCharacters', () => {
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

        expect(state.error).toBe(error);
    })
})

describe('fetchCharactersItem', () => {
    it('should change status with "fetchCharactersItem.pending" action', () => {
        const state = charactersSlice.reducer(initialState, fetchCharactersItem.pending);

        expect(state.isLoading).toBeTruthy();
    })

    it('should change status with "fetchCharactersItem.fulfilled" action', () => {
        const character: Character<Episode[]> = {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
                name: 'Earth (C-137)',
                url: 'https://rickandmortyapi.com/api/location/1'
            },
            location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3'
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            episode: [
                {
                    id: 1,
                    name: 'Pilot',
                    air_date: 'December 2, 2013',
                    episode: 'S01E01',
                    characters: [
                        'https://rickandmortyapi.com/api/character/1',
                        'https://rickandmortyapi.com/api/character/2',
                        'https://rickandmortyapi.com/api/character/35',
                    ],
                    url: 'https://rickandmortyapi.com/api/episode/1',
                    created: '2017-11-10T12:56:33.798Z'
                },
            ],
            url: 'https://rickandmortyapi.com/api/character/1',
            created: '2017-11-04T18:48:46.250Z'
        };

        const state = charactersSlice.reducer(initialState, fetchCharactersItem.fulfilled(character, '1', ''));

        expect(state.character.name).toBe(character.name);
        expect(state.character.episode.length).toBeTruthy();
    })

    it('should change status with "fetchCharactersItem.rejected" action', () => {
        const error = 'Can\'t fetch data';

        const state = charactersSlice.reducer(initialState, fetchCharactersItem.rejected(null, error, '', error));

        expect(state.error).toBe(error);
    })
})

describe('changeCharactersFilter', () => {
    it('should change state -> filter with action "changeCharactersFilter"', () => {
        const filter: CharacterFilter = {
            page: 1,
            name: 'Rick',
            type: '',
            gender: 'Male',
            species: 'Human',
            status: 'Male'
        };

        const state = charactersSlice.reducer(initialState, changeCharactersFilter(filter));

        expect(state.filter.name).toBe(filter.name);
    })
})
