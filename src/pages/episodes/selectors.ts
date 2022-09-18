import {RootState} from '../../components/app/store';

export const selectEpisodeIsLoading = (state: RootState) => state.episodesPage.isLoading;
export const selectEpisode = (state: RootState) => state.episodesPage.episode.episode;
export const selectEpisodeName = (state: RootState) => state.episodesPage.episode.name;
export const selectEpisodeAirDate = (state: RootState) => state.episodesPage.episode.air_date;
export const selectEpisodeCharacters = (state: RootState) => state.episodesPage.episode.characters;
export const selectEpisodeResults = (state: RootState) => state.episodesPage.data.results;
export const selectEpisodePrevPage = (state: RootState) => state.episodesPage.data.info?.prev;
export const selectEpisodeNextPage = (state: RootState) => state.episodesPage.data.info?.next;
export const selectEpisodeCount = (state: RootState) => state.episodesPage.data.info?.count;
export const selectEpisodeFilterName = (state: RootState) => state.episodesPage.filter.name;
export const selectEpisodeFilterPage = (state: RootState) => state.episodesPage.filter.page;
export const selectEpisodeError = (state: RootState) => state.episodesPage.error;