import {RootState} from '../../components/app/store';

export const selectLocationIsLoading = (state: RootState) => state.locationsPage.isLoading;
export const selectLocationName = (state: RootState) => state.locationsPage.location.name;
export const selectLocationType = (state: RootState) => state.locationsPage.location.type;
export const selectLocationResidents = (state: RootState) => state.locationsPage.location.residents;
export const selectLocationDimension = (state: RootState) => state.locationsPage.location.dimension;