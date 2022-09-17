import {RootState} from '../../components/app/store';

export const selectEpisodeIsLoading = (state: RootState) => state.episodesPage.isLoading;
export const selectEpisode = (state: RootState) => state.episodesPage.episode.episode;
export const selectEpisodeName = (state: RootState) => state.episodesPage.episode.name;
export const selectEpisodeAirDate = (state: RootState) => state.episodesPage.episode.air_date;
export const selectEpisodeCharacters = (state: RootState) => state.episodesPage.episode.characters;