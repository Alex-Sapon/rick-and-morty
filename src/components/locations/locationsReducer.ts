import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api, Info, Location, LocationFilter} from '../../api/api';
import {RootState} from '../app/store';

const fetchLocations = createAsyncThunk<Info<Location[]>, void, { rejectValue: string }>
('locations/fetchLocations', async (_, {rejectWithValue, getState}) => {
    const {type, name, page, dimension} = (getState() as RootState).locationsPage.filter;

    try {
        return await api.getLocation({type, name, page, dimension});
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
    }
})

export const locationsReducer = locationsSlice.reducer;
const {changeLocationsFilter} = locationsSlice.actions;
export const locationsActions = {fetchLocations, changeLocationsFilter};

type InitialStateType = {
    filter: LocationFilter
    data: Info<Location[]>
    isLoading: boolean
    error: string | null
}