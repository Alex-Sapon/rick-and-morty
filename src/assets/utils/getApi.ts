const BASE_URL = `https://rickandmortyapi.com/api/`;

export function getApi<T>(url: string): Promise<T> {
    return fetch(BASE_URL + url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText ? response.statusText : 'Can\'t fetch data');
            }

            return response.json() as Promise<T>;
        })
}