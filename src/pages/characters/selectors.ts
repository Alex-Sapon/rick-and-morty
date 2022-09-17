import {RootState} from '../../components/app/store';

export const selectCharacterGender = (state: RootState) => state.charactersPage.character.gender;
export const selectCharacterName = (state: RootState) => state.charactersPage.character.name;
export const selectCharacterImage = (state: RootState) => state.charactersPage.character.image;
export const selectCharacterSpecies = (state: RootState) => state.charactersPage.character.species;
export const selectCharacterStatus = (state: RootState) => state.charactersPage.character.status;
export const selectCharacterEpisode = (state: RootState) => state.charactersPage.character.episode;
export const selectCharacterLocation = (state: RootState) => state.charactersPage.character.location;
export const selectCharacterOrigin = (state: RootState) => state.charactersPage.character.origin;
export const selectCharacterType = (state: RootState) => state.charactersPage.character.type;
export const selectCharacterIsLoading = (state: RootState) => state.charactersPage.isLoading;

export const selectCharacterResults = (state: RootState) => state.charactersPage.data.results;
export const selectCharacterCount = (state: RootState) => state.charactersPage.data.info?.count;
export const selectCharacterFilterGender = (state: RootState) => state.charactersPage.filter.gender;
export const selectCharacterFilterName = (state: RootState) => state.charactersPage.filter.name;
export const selectCharacterFilterSpecies = (state: RootState) => state.charactersPage.filter.species;
export const selectCharacterFilterStatus = (state: RootState) => state.charactersPage.filter.status;
export const selectCharacterFilterPage = (state: RootState) => state.charactersPage.filter.page;
export const selectCharacterFilterNextPage = (state: RootState) => state.charactersPage.data.info?.next;
export const selectCharacterFilterPrevPage = (state: RootState) => state.charactersPage.data.info?.prev;
