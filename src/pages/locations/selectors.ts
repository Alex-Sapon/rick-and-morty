import {RootState} from '../../components/app/store';

export const selectLocationIsLoading = (state: RootState) => state.locationsPage.isLoading;
export const selectLocationName = (state: RootState) => state.locationsPage.location.name;
export const selectLocationType = (state: RootState) => state.locationsPage.location.type;
export const selectLocationResidents = (state: RootState) => state.locationsPage.location.residents;
export const selectLocationDimension = (state: RootState) => state.locationsPage.location.dimension;
export const selectLocationResults = (state: RootState) => state.locationsPage.data.results;
export const selectLocationCount = (state: RootState) => state.locationsPage.data.info?.count;
export const selectLocationPrevPage = (state: RootState) => state.locationsPage.data.info?.prev;
export const selectLocationNextPage = (state: RootState) => state.locationsPage.data.info?.next;
export const selectLocationFilterName = (state: RootState) => state.locationsPage.filter.name;
export const selectLocationFilterDimension = (state: RootState) => state.locationsPage.filter.dimension;
export const selectLocationFilterType = (state: RootState) => state.locationsPage.filter.type;
export const selectLocationFilterPage = (state: RootState) => state.locationsPage.filter.page;