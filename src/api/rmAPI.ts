const BASE_URL = `https://rickandmortyapi.com/api/`;

function api<T>(url: string): Promise<T> {
    return fetch(BASE_URL + url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json() as Promise<T>;
        })
}

export const rmAPI = {
    getCharacters({page, name, status, gender, species}: CharacterFilter) {
        const CHARACTERS = `character/?page=${page}&name=${name}&status=${status}&gender=${gender}&species=${species}`;

        return api<Info<Character[]>>(CHARACTERS);
    },
    getCharactersItem(id: string) {
        return api<Character>(`character/${id}`);
    },
    getLocation({page, name, dimension, type}: LocationFilter): Promise<Info<Location[]>> {
        const LOCATION = `location?page=${page}&name=${name}&dimension=${dimension}&type=${type}`;

        return api<Info<Location[]>>(LOCATION);
    },
    getLocationItem(id: string) {
        return api<Location>(`location/${id}`);
    },
    getEpisode({page, name}: EpisodeFilter) {
        const EPISODE = `episode?page=${page}&name=${name}`;

        return api<Info<Episode[]>>(EPISODE);
    },
    getEpisodeItem(id: string) {
        return api<Episode>(`episode/${id}`);
    },
}

export interface CharacterLocation {
    name: string
    url: string
}

export interface ResourceBase {
    id: number
    name: string
    url: string
    created: string
}

export interface Endpoints {
    character: string
    location: string
    episode: string
}

export interface CharacterFilter {
    name?: string
    /**
     * 'Genetic experiment'
     * | 'Superhuman (Ghost trains summoner' | 'Parasite' | 'Human with antennae'
     * | 'Human with ants in his eyes' | 'Fish-Person' | 'Cromulon' | 'Mytholog'
     */
    type?: string
    /**
     * 'Human' | 'Humanoid' | 'unknown' | 'Robot' | 'Alien' | 'Disease'
     */
    species?: string
    /**
     * 'Dead' | 'Alive' | 'unknown'
     */
    status?: string
    /**
     * 'Female' | 'Male' | 'Genderless' | 'unknown'
     */
    gender?: string
    page?: number
}

export interface LocationFilter extends Pick<CharacterFilter, 'name' | 'type' | 'page'> {
    dimension?: string
}

export interface EpisodeFilter extends Pick<CharacterFilter, 'name' | 'page'> {
    /**
     * Filter by the given episode code.
     * i.e: `{ episode: "S01E01" }`
     */
    episode?: string
}

export interface Character<T = string[]> extends ResourceBase {
    status: 'Dead' | 'Alive' | 'unknown'
    species: string
    type: string
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
    origin: CharacterLocation
    location: CharacterLocation
    image: string
    episode: T
}

export interface Location<T = string[]> extends ResourceBase {
    type: string
    dimension: string
    residents: T
}

export interface Episode<T = string[]> extends ResourceBase {
    air_date: string
    episode: string
    characters: T
}

export interface ApiResponse<T> {
    /** The HTTP status code from the API response */
    status: number
    /** The HTTP status message from the API response */
    statusMessage: string
    /** The response that was provided by the API */
    data: T
}

export interface Info<T> {
    /**
     * The API will automatically paginate the responses. You will receive up to `20` documents per page.
     */
    info?: {
        /** The length of the response */
        count: number
        /** The amount of pages */
        pages: number
        /** Link to the next page (if it exists) */
        next: string | null
        /** Link to the previous page (if it exists) */
        prev: string | null
    }
    results: T
}
