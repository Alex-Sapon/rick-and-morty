import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api, Character, Info, Location, LocationFilter} from '../../api/api';
import {RootState} from '../app/store';
import {getId} from '../../assets/utils/getId';

const fetchLocations = createAsyncThunk<Info<Location[]>, void, { rejectValue: string }>
('locations/fetchLocations', async (_, {rejectWithValue, getState}) => {
    const {type, name, page, dimension} = (getState() as RootState).locationsPage.filter;

    try {
        return await api.getLocation({type, name, page, dimension});
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
})

const fetchLocationsItem = createAsyncThunk<Location<Character[]>, { id: number }, { rejectValue: string }>
('locations/fetchLocationsItem', async ({id}, {rejectWithValue}) => {
    try {
        const result = await api.getLocationItem(id);

        const residentsResponse = result.residents.map(async (residentUrl) => {
            return await api.getCharactersItem(getId(residentUrl));
        })

        const residents = await Promise.all(residentsResponse);

        return {...result, residents};
    } catch (e) {
        return rejectWithValue((e as Error).message);
    }
})

const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        filter: {page: 1, name: '', dimension: '', type: ''},
        data: {
            info: {count: 0, pages: 0, next: null, prev: null},
            results: [],
        },
        location: {} as Location<Character[]>,
        isLoading: false,
        error: null,
    } as InitialStateType,
    reducers: {
        changeLocationsFilter(state, action: PayloadAction<LocationFilter>) {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload!;
            })
            .addCase(fetchLocationsItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLocationsItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.location = action.payload;
            })
            .addCase(fetchLocationsItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload!;
            })
    }
})

export const locationsReducer = locationsSlice.reducer;
const {changeLocationsFilter} = locationsSlice.actions;
export const locationsActions = {fetchLocations, changeLocationsFilter, fetchLocationsItem};

type InitialStateType = {
    filter: LocationFilter
    data: Info<Location[]>
    location: Location<Character[]>
    isLoading: boolean
    error: string | null
}